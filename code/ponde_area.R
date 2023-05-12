


shp <- read_sf("data/world-administrative-boundaries/")
shp$area <- round(as.numeric(st_area(shp)) /1e6, 3)
shp$ponde <- abs(log(shp$area))

write_sf(obj = shp, "data/mundo.gpkg", driver = "GPKG")




i <- sample(1:nrow(shp), 1, prob = shp$ponde)
selected <- shp[i,] 

selected$name



selected$iso3
selected$iso_3166_1_
selected$name

paste0("https://www.google.com/maps?q=", selected$name)

shp %>% 
  ggplot(aes(x = area)) +
  geom_histogram(bins = 60)

shp %>% 
  ggplot(aes(x = ponde)) +
  geom_histogram(binwidth = 1)
