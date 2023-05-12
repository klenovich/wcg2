library(tidyverse)
library(sf)
library(geosphere)

orientation <- function(guess, solution) {
  require(geosphere)
  require(sf)
  suppressWarnings({
    x <- st_centroid(guess)
    y <- st_centroid(solution)
  })

  x <- c(x$geometry[[1]][1], x$geometry[[1]][2])
  y <- c(y$geometry[[1]][1], y$geometry[[1]][2])
  b <- geosphere::bearingRhumb(x, y)
  
  course <- (b + 360) %% 360 # add full circle, i.e. +360, and determine modulo for 360
  course
  
  puntos <- c("N" = 0, "NE" = 45, "E" = 90, "SE" = 135, "S" = 180, "SO" = 225, "O" = 270, "NO" = 315, "N" = 360)
  
  x <- abs(puntos - course)
  names(x[x == min(x)])
}






shp <- read_sf("data/world-administrative-boundaries/")


guess <- shp[sample(1:nrow(shp), 1),]

guess <- filter(shp, name == "Suriname")
solution <- filter(shp, name == "Poland")

rbind(solution, guess) %>% 
  ggplot() +
  geom_sf() + 
  geom_sf_text(aes(label = name)) +
  theme_void()


orientation(guess, solution)


x <- filter(shp, name == "Spain")

x %>% 
  ggplot() +
  geom_sf(fill = "black", color = "white") +  
  geom_sf_text(aes(label = name)) +
  theme_void()  +
  coord_sf(crs = "+proj=merc")
