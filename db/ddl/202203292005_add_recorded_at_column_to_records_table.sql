ALTER TABLE training_manager.records
ADD recorded_at DATETIME NOT NULL
AFTER memo
;
