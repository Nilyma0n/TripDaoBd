USE tripdaobd;

SELECT
    id,
    user_id,
    title,
    message,
    type,
    link,
    is_read,
    created_at
FROM notifications
WHERE user_id = 2
ORDER BY created_at DESC;