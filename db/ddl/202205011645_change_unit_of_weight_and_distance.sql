ALTER TABLE training_manager.records
RENAME COLUMN weight_kg TO weight,
RENAME COLUMN distance_km TO distance,
DROP weight_lb,
DROP distance_mile,
ADD weight_type VARCHAR(10) AFTER weight,
ADD distance_type VARCHAR(10) AFTER distance
;
