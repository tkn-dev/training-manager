CREATE TABLE training_manager.records(
  id INT NOT NULL AUTO_INCREMENT,
  exercise_date DATE NOT NULL,
  exercise VARCHAR(30) NOT NULL,
  weight_kg DECIMAL(5,2),
  weight_lb DECIMAL(6,2),
  repetition INT,
  is_supported BOOLEAN,
  left_or_right ENUM('none', 'left', 'right'),
  distance_km DECIMAL(6,3),
  distance_mile DECIMAL(6,3),
  run_time TIME,
  memo VARCHAR(200),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  primary key(id)
);
