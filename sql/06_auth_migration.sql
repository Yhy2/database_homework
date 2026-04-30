ALTER TABLE `user`
    ADD COLUMN password_hash VARCHAR(255) NULL;

UPDATE `user`
SET password_hash = 'pbkdf2:sha256:600000$campus-demo-salt$97e3153876af4e7906f32a939d5872ec527e0b78d69dea594facbaeba59079a9'
WHERE password_hash IS NULL OR password_hash = '';

ALTER TABLE `user`
    MODIFY password_hash VARCHAR(255) NOT NULL;
