import pool from "../config/db.js";

/**
 * GET /api/destinations
 *
 * Supports:
 * ?division=Sylhet
 * ?district=Sylhet
 * ?category=Waterfall
 * ?featured=true
 * ?popular=true
 * ?search=jaflong
 * ?page=1
 * ?limit=9
 */
export const getDestinations = async (req, res) => {
  try {
    const {
      division,
      district,
      category,
      featured,
      popular,
      search,
    } = req.query;

    const page = Math.max(
      parseInt(req.query.page, 10) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        parseInt(req.query.limit, 10) || 9,
        1
      ),
      100
    );

    const offset = (page - 1) * limit;

    const conditions = [];
    const params = [];

    // Division filter
    if (division) {
      conditions.push("d.division = ?");
      params.push(division);
    }

    // District filter
    if (district) {
      conditions.push("d.district = ?");
      params.push(district);
    }

    // Category filter
    if (category) {
      conditions.push("d.category = ?");
      params.push(category);
    }

    // Featured filter
    if (featured !== undefined) {
      conditions.push("d.featured = ?");
      params.push(
        featured === "true" ? 1 : 0
      );
    }

    // Popular filter
    if (popular !== undefined) {
      conditions.push("d.popular = ?");
      params.push(
        popular === "true" ? 1 : 0
      );
    }

    // Search
    if (search) {
      conditions.push(`
        (
          d.name LIKE ?
          OR d.district LIKE ?
          OR d.division LIKE ?
          OR d.category LIKE ?
          OR d.short_description LIKE ?
        )
      `);

      const searchValue = `%${search}%`;

      params.push(
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue
      );
    }

    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(" AND ")}`
        : "";

    // =====================================================
    // TOTAL COUNT
    // =====================================================

    const countSql = `
      SELECT COUNT(*) AS total
      FROM destinations d
      ${whereClause}
    `;

    const [countRows] = await pool.query(
      countSql,
      params
    );

    const total = Number(countRows[0].total);

    const totalPages =
      total > 0
        ? Math.ceil(total / limit)
        : 0;

    // =====================================================
    // DESTINATIONS
    // =====================================================

    const dataSql = `
      SELECT
        d.id,
        d.slug,
        d.name,
        d.district,
        d.division,
        d.category,
        d.short_description,
        d.description,
        d.hero_image,
        d.latitude,
        d.longitude,
        d.map_url,
        d.best_season,
        d.opening_hours,
        d.entry_fee,
        d.estimated_duration,
        d.rating,
        d.total_reviews,
        d.featured,
        d.popular,
        d.created_at,
        d.updated_at
      FROM destinations d
      ${whereClause}
      ORDER BY
        d.featured DESC,
        d.popular DESC,
        d.rating DESC,
        d.name ASC
      LIMIT ? OFFSET ?
    `;

    const dataParams = [
      ...params,
      limit,
      offset,
    ];

    const [rows] = await pool.query(
      dataSql,
      dataParams
    );

    return res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage:
          page < totalPages,
        hasPreviousPage:
          page > 1,
      },
    });
  } catch (error) {
    console.error(
      "getDestinations error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch destinations",
    });
  }
};


/**
 * GET /api/destinations/:slug
 *
 * Returns:
 * Destination
 * + Images
 * + Highlights
 * + Activities
 * + Reviews
 */
export const getDestinationBySlug = async (
  req,
  res
) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message:
          "Destination slug is required",
      });
    }

    // =====================================================
    // DESTINATION
    // =====================================================

    const destinationSql = `
      SELECT
        d.id,
        d.slug,
        d.name,
        d.district,
        d.division,
        d.category,
        d.short_description,
        d.description,
        d.hero_image,
        d.latitude,
        d.longitude,
        d.map_url,
        d.best_season,
        d.opening_hours,
        d.entry_fee,
        d.estimated_duration,
        d.rating,
        d.total_reviews,
        d.featured,
        d.popular,
        d.created_at,
        d.updated_at
      FROM destinations d
      WHERE d.slug = ?
      LIMIT 1
    `;

    const [destinationRows] =
      await pool.query(
        destinationSql,
        [slug]
      );

    if (destinationRows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Destination not found",
      });
    }

    const destination =
      destinationRows[0];

    // =====================================================
    // IMAGES
    // =====================================================

    const [images] =
      await pool.query(
        `
          SELECT
            id,
            image_url,
            alt_text,
            sort_order
          FROM destination_images
          WHERE destination_id = ?
          ORDER BY sort_order ASC, id ASC
        `,
        [destination.id]
      );

    // =====================================================
    // HIGHLIGHTS
    // =====================================================

    const [highlights] =
      await pool.query(
        `
          SELECT
            id,
            highlight,
            sort_order
          FROM destination_highlights
          WHERE destination_id = ?
          ORDER BY sort_order ASC, id ASC
        `,
        [destination.id]
      );

    // =====================================================
    // ACTIVITIES
    // =====================================================

    const [activities] =
      await pool.query(
        `
          SELECT
            id,
            activity,
            sort_order
          FROM destination_activities
          WHERE destination_id = ?
          ORDER BY sort_order ASC, id ASC
        `,
        [destination.id]
      );

    // =====================================================
    // REVIEWS
    // =====================================================

    const [reviews] =
      await pool.query(
        `
          SELECT
            id,
            user_id,
            user_name,
            rating,
            comment,
            review_date,
            created_at
          FROM destination_reviews
          WHERE destination_id = ?
          ORDER BY created_at DESC
        `,
        [destination.id]
      );

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      data: {
        ...destination,
        images,
        highlights,
        activities,
        reviews,
      },
    });
  } catch (error) {
    console.error(
      "getDestinationBySlug error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch destination",
    });
  }
};