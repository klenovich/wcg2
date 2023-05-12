# Funcion para computar la orientación
orientation <- function(from, to) {
  suppressWarnings({
    x <- st_centroid(from)
    y <- st_centroid(to)
  })
  
  x <- c(x$geom[[1]][1], x$geom[[1]][2])
  y <- c(y$geom[[1]][1], y$geom[[1]][2])
  b <- geosphere::bearingRhumb(x, y)
  
  course <- (b + 360) %% 360 # add full circle, i.e. +360, and determine modulo for 360
  course
  
  puntos <- c("Norte" = 0, "Noreste" = 45, "Este" = 90, "Sureste" = 135, 
              "Sur" = 180, "Suroeste" = 225, "Oeste" = 270, "Noroeste" = 315, "Norte" = 360)
  
  x <- abs(puntos - course)
  names(x[x == min(x)])
}

distance_km <- function(from, to) {
  suppressWarnings({
    distance <- round(as.numeric(st_distance(st_centroid(to), st_centroid(from))[1,1] / 1000))
  })
  distance <- paste(distance, "km")
}

google_maps_url <- function(solution) {
  n <- solution$name
  iso <- solution$iso_3166_1_
  n <- str_remove_all(n, "'")
  n <- str_replace_all(n, " ", "+") 
  paste0("https://www.google.com/maps?q=", n, "+", iso)
  
}