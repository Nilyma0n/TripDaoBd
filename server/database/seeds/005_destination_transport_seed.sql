USE tripdaobd;

-- ============================================================
-- TripDaoBD
-- Seed 005: Destination Transport / How To Get There
-- Core 10 Destinations
-- ============================================================

-- ------------------------------------------------------------
-- 1. Cox's Bazar
-- ------------------------------------------------------------

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'bus',
    'By Bus',
    'Direct and connecting bus services are available from Dhaka and other major cities.',
    '8–12 hours',
    700,
    2500,
    'Travel to Cox''s Bazar by intercity bus. From the main bus terminal, use CNG, auto-rickshaw or ride-sharing services to reach your destination.',
    1
FROM destinations d
WHERE d.slug = 'coxs-bazar'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'bus'
      AND t.title = 'By Bus'
);

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'flight',
    'By Air',
    'Flights are available to Cox''s Bazar Airport from major cities depending on airline schedules.',
    '1–1.5 hours',
    3500,
    12000,
    'Fly to Cox''s Bazar Airport and continue by CNG, auto-rickshaw, taxi or ride-sharing service.',
    2
FROM destinations d
WHERE d.slug = 'coxs-bazar'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'flight'
      AND t.title = 'By Air'
);

-- ------------------------------------------------------------
-- 2. Saint Martin's Island
-- ------------------------------------------------------------

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'bus',
    'Bus to Teknaf',
    'Travel by bus from Dhaka or other major cities toward Teknaf.',
    '9–13 hours',
    800,
    2500,
    'Reach Teknaf by intercity bus. From Teknaf, continue to the designated vessel terminal for the island journey.',
    1
FROM destinations d
WHERE d.slug = 'saint-martin'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'bus'
      AND t.title = 'Bus to Teknaf'
);

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'boat',
    'By Vessel',
    'Island access depends on seasonal vessel operations and government regulations.',
    '2–3 hours',
    800,
    3000,
    'Reach Teknaf and board an authorized passenger vessel according to the current seasonal schedule and operating rules.',
    2
FROM destinations d
WHERE d.slug = 'saint-martin'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'boat'
      AND t.title = 'By Vessel'
);

-- ------------------------------------------------------------
-- 3. Sundarbans
-- ------------------------------------------------------------

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'bus',
    'Travel via Khulna',
    'Khulna is one of the major gateways for organized Sundarbans trips.',
    '6–10 hours to Khulna',
    600,
    2200,
    'Travel to Khulna by bus or other intercity transport. Continue toward the selected Sundarbans gateway according to your tour plan.',
    1
FROM destinations d
WHERE d.slug = 'sundarbans'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'bus'
      AND t.title = 'Travel via Khulna'
);

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'boat',
    'By Tour Boat',
    'Most Sundarbans exploration requires an authorized boat or organized tour.',
    '1–4+ days',
    3000,
    20000,
    'Book an authorized Sundarbans tour and follow the operator''s route, permit and vessel instructions.',
    2
FROM destinations d
WHERE d.slug = 'sundarbans'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'boat'
      AND t.title = 'By Tour Boat'
);

-- ------------------------------------------------------------
-- 4. Sylhet
-- ------------------------------------------------------------

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'bus',
    'By Bus',
    'Intercity buses connect Sylhet with Dhaka and other major cities.',
    '5–7 hours',
    500,
    1800,
    'Take an intercity bus to Sylhet. From the terminal, use CNG, auto-rickshaw, taxi or ride-sharing services.',
    1
FROM destinations d
WHERE d.slug = 'sylhet'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'bus'
      AND t.title = 'By Bus'
);

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'train',
    'By Train',
    'Intercity train services connect Sylhet with Dhaka and other locations.',
    '6–8 hours',
    300,
    1500,
    'Take an intercity train to Sylhet Railway Station, then continue by local transport to your destination.',
    2
FROM destinations d
WHERE d.slug = 'sylhet'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'train'
      AND t.title = 'By Train'
);

-- ------------------------------------------------------------
-- 5. Sreemangal
-- ------------------------------------------------------------

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'train',
    'By Train',
    'Train services are available to Sreemangal from Dhaka and other major locations.',
    '4–6 hours',
    300,
    1500,
    'Travel to Sreemangal Railway Station. From the station, use CNG, auto-rickshaw or reserved transport.',
    1
FROM destinations d
WHERE d.slug = 'sreemangal'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'train'
      AND t.title = 'By Train'
);

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'bus',
    'By Bus',
    'Bus services connect Sreemangal with Dhaka, Sylhet and nearby areas.',
    '4–6 hours',
    400,
    1600,
    'Reach Sreemangal by intercity bus and use local transport from the bus stand.',
    2
FROM destinations d
WHERE d.slug = 'sreemangal'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'bus'
      AND t.title = 'By Bus'
);

-- ------------------------------------------------------------
-- 6. Jaflong
-- ------------------------------------------------------------

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'car',
    'Private Car',
    'Private car or hired vehicle provides convenient access from Sylhet city.',
    '1.5–2 hours',
    1200,
    3500,
    'Travel from Sylhet city toward Jaflong using the Sylhet–Jaflong route. Local transport is available near the destination area.',
    1
FROM destinations d
WHERE d.slug = 'jaflong'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'car'
      AND t.title = 'Private Car'
);

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'cng',
    'By CNG',
    'CNG auto-rickshaws are commonly used for travel from Sylhet toward Jaflong.',
    '2–2.5 hours',
    600,
    1500,
    'Hire a CNG from Sylhet city and confirm the fare before starting the trip.',
    2
FROM destinations d
WHERE d.slug = 'jaflong'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'cng'
      AND t.title = 'By CNG'
);

-- ------------------------------------------------------------
-- 7. Bandarban
-- ------------------------------------------------------------

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'bus',
    'By Bus',
    'Intercity bus services connect Bandarban with Dhaka and Chattogram.',
    '7–10 hours',
    600,
    2200,
    'Travel to Bandarban bus terminal. Continue to your selected attraction using local transport or an arranged vehicle.',
    1
FROM destinations d
WHERE d.slug = 'bandarban'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'bus'
      AND t.title = 'By Bus'
);

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'car',
    'Private Car / Microbus',
    'Private vehicles are useful for groups exploring multiple Bandarban locations.',
    '6–9 hours',
    2500,
    8000,
    'Hire a suitable private vehicle and confirm the route, waiting time and destination access conditions before departure.',
    2
FROM destinations d
WHERE d.slug = 'bandarban'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'car'
      AND t.title = 'Private Car / Microbus'
);

-- ------------------------------------------------------------
-- 8. Sajek Valley
-- ------------------------------------------------------------

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'bus',
    'Bus to Khagrachari',
    'Travel to Khagrachari first and continue toward Sajek by permitted local transport.',
    '6–9 hours to Khagrachari',
    600,
    2200,
    'Reach Khagrachari by intercity transport. From there, arrange an authorized local vehicle according to current access rules.',
    1
FROM destinations d
WHERE d.slug = 'sajek-valley'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'bus'
      AND t.title = 'Bus to Khagrachari'
);

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'jeep',
    'Reserved Jeep / Chander Gari',
    'Reserved local jeeps are commonly used for the hill route toward Sajek.',
    '2.5–4 hours from Khagrachari',
    3000,
    7000,
    'Arrange a suitable local vehicle from Khagrachari and confirm the current route, passenger capacity and access requirements.',
    2
FROM destinations d
WHERE d.slug = 'sajek-valley'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'jeep'
      AND t.title = 'Reserved Jeep / Chander Gari'
);

-- ------------------------------------------------------------
-- 9. Rangamati
-- ------------------------------------------------------------

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'bus',
    'By Bus',
    'Intercity buses connect Rangamati with Chattogram and Dhaka.',
    '6–9 hours',
    500,
    2000,
    'Travel to Rangamati bus terminal and continue to your selected attraction using CNG, auto-rickshaw or reserved transport.',
    1
FROM destinations d
WHERE d.slug = 'rangamati'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'bus'
      AND t.title = 'By Bus'
);

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'boat',
    'By Boat',
    'Boat services can be used for lake-based sightseeing and access to selected attractions.',
    '1–4+ hours',
    500,
    5000,
    'Arrange a local boat from an authorized or established jetty and confirm the route, duration, passenger capacity and fare.',
    2
FROM destinations d
WHERE d.slug = 'rangamati'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'boat'
      AND t.title = 'By Boat'
);

-- ------------------------------------------------------------
-- 10. Kuakata
-- ------------------------------------------------------------

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'bus',
    'By Bus',
    'Intercity buses connect Kuakata with Dhaka, Barishal and other regions.',
    '6–9 hours',
    600,
    2200,
    'Travel to Kuakata by intercity bus. From the terminal, use local transport to reach hotels and beach areas.',
    1
FROM destinations d
WHERE d.slug = 'kuakata'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'bus'
      AND t.title = 'By Bus'
);

INSERT INTO destination_transport_options
(
    destination_id,
    transport_type,
    title,
    description,
    estimated_time,
    estimated_cost_min,
    estimated_cost_max,
    instruction,
    sort_order
)
SELECT
    d.id,
    'car',
    'Private Car',
    'Private vehicles provide flexible access to Kuakata and nearby attractions.',
    '5–8 hours',
    2500,
    8000,
    'Drive toward Kuakata using the available regional road and ferry/bridge connections. Confirm current road conditions before travel.',
    2
FROM destinations d
WHERE d.slug = 'kuakata'
AND NOT EXISTS (
    SELECT 1
    FROM destination_transport_options t
    WHERE t.destination_id = d.id
      AND t.transport_type = 'car'
      AND t.title = 'Private Car'
);