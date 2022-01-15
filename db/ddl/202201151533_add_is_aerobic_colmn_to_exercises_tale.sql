ALTER TABLE training_manager.exercises
ADD is_aerobic BOOLEAN NOT NULL DEFAULT false
AFTER name
;
