ALTER TABLE records
CHANGE weight_kg weight DECIMAL,
CHANGE distance_km distance DECIMAL,
DROP weight_lb,
DROP distance_mile,
ADD weight_type VARCHAR(10) AFTER weight,
ADD distance_type VARCHAR(10) AFTER distance
;
