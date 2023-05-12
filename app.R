#
# This is a Shiny web application. You can run the application by clicking
# the 'Run App' button above.
#
# Find out more about building applications with Shiny here:
#
#    http://shiny.rstudio.com/
#

library(shiny)
library(tidyverse)
library(sf)
library(shinyjs)
library(geosphere)
library(shinydashboard)

source("code/functions.R", encoding = "UTF-8")

shp <- read_sf("data/mundo.gpkg")
choices <- sort(shp$name)

# Define UI for application that draws a histogram
ui <- fluidPage(class = "text-center",
                tags$head(
                  tags$link(rel = "stylesheet", type = "text/css", href = "styles.css")
                ),
                
                
                
                # Application title
                HTML("<h1 class='titulo'>Wo</h1><h1 class='titulo2'>RL</h1><h1 class='titulo'>dle</h1>"),
                
                # Sidebar with a slider input for number of bins 
                fluidPage(align="center",
                          
                          useShinyjs(),
                          
                          # Mensajes con pistas
                          hidden(htmlOutput("clue1") %>% tagAppendAttributes(class= 'clue')),
                          hidden(htmlOutput("clue2") %>% tagAppendAttributes(class= 'clue')),
                          hidden(htmlOutput("clue3") %>% tagAppendAttributes(class= 'clue')),
                          hidden(htmlOutput("clue4") %>% tagAppendAttributes(class= 'clue')),
                          hidden(htmlOutput("clue5") %>% tagAppendAttributes(class= 'clue')),
                          hidden(htmlOutput("clue6") %>% tagAppendAttributes(class= 'clue')),
                          hidden(htmlOutput("answer") %>% tagAppendAttributes(class= 'clue')),
                          
                          # Rectangulos grises
                          tags$div(id = "box1", class='whiteDivider'),
                          tags$div(id = "box2", class='whiteDivider'),
                          tags$div(id = "box3", class='whiteDivider'),
                          tags$div(id = "box4", class='whiteDivider'),
                          tags$div(id = "box5", class='whiteDivider'),
                          tags$div(id = "box6", class='whiteDivider'),
                          
                          # Selectores de respuesta
                          selectInput("guess1", label = NULL, width = "300px", choices = choices, multiple = F, selectize = T),
                          hidden(selectInput("guess2", label = NULL, width = "300px", choices = choices, multiple = F, selectize = T)),
                          hidden(selectInput("guess3", label = NULL, width = "300px", choices = choices, multiple = F, selectize = T)),
                          hidden(selectInput("guess4", label = NULL, width = "300px", choices = choices, multiple = F, selectize = T)),
                          hidden(selectInput("guess5", label = NULL, width = "300px", choices = choices, multiple = F, selectize = T)),
                          hidden(selectInput("guess6", label = NULL, width = "300px", choices = choices, multiple = F, selectize = T)),
                          
                          # Botones de enviar respuesta
                          actionButton("send_guess1", label = "Adivina"),
                          hidden(actionButton("send_guess2", label = "Adivina")),
                          hidden(actionButton("send_guess3", label = "Adivina")),
                          hidden(actionButton("send_guess4", label = "Adivina")),
                          hidden(actionButton("send_guess5", label = "Adivina")),
                          hidden(actionButton("send_guess6", label = "Adivina")),
                          
                          # Mensaje de victoria
                          hidden(
                            h4( id="congrats-msg", "¡Enhorabuena, has acertado!")
                          ),
                          
                          tags$div(plotOutput("map", width = "60%"), style = "padding-top: 20px"),
                          
                          tags$div(
                            id = "footer",
                            HTML("<p class = 'footer-text'><a href='https://worldle.teuteuf.fr/'>Idea original</a> de <a href='https://twitter.com/teuteuf'>Teuteuf</a>.</p>"),
                            HTML("<p class = 'footer-text'>Desarrollado por <a href= 'https://www.hmeleiro.com/'>Héctor Meleiro</a> para jugar más de una vez al día.</p>")
                          )
                          
                          
                )
)

# Define server logic required to draw a histogram
server <- function(input, output, session) {
  
  
  solution <- reactive({
    shp[sample(1:nrow(shp), 1, prob = shp$ponde),]
  }) 
  
  
  output$map <- renderPlot({
    
    suppressWarnings({
      solution() %>% 
        ggplot() +
        geom_sf(fill = "black", color = "white") +  
        # geom_sf_text(aes(label = name), color = "white") +
        theme_void() +
        coord_sf(crs = "+proj=merc")
    })
  })
  
  
  
  # Intento 1
  observeEvent(input$send_guess1, {
    correcto <- input$guess1 == solution()$name
    
    if(correcto) {
      hide("send_guess1")
      hide("box1")
      show("answer")
      
      show("congrats-msg")
      
      output$answer <- renderUI({
        url <- google_maps_url(solution())
        HTML(paste0("<a href='", url, "' target='_blank'>", solution()$name, "</a>" ))
      })
      
    } else {
      hide("box1")
      hide("guess1")
      hide("send_guess1")
      
      show("clue1")
      show("guess2")
      show("send_guess2")
      
      
      output$clue1 <- renderUI({
        guess_sf <- filter(shp, name == input$guess1)
        
        bearing <- orientation(guess_sf, solution())
        distance <- distance_km(solution(), guess_sf)
        HTML(paste(guess_sf$name, distance, bearing, sep = "  |  "))
        
      })
      
    }
    
    
  })
  
  
  # Intento 2
  observeEvent(input$send_guess2, {
    correcto <- input$guess2 == solution()$name
    
    if(correcto) {
      hide("send_guess2")
      hide("box2")
      show("answer")
      
      show("congrats-msg")
      
      output$answer <- renderUI({
        url <- google_maps_url(solution())
        HTML(paste0("<a href='", url, "' target='_blank'>", solution()$name, "</a>" ))
      })
      
    } else {
      hide("guess2")
      hide("send_guess2")
      hide("box2")
      
      show("clue2")
      show("guess3")
      show("send_guess3")
      
      
      output$clue2 <- renderUI({
        guess_sf <- filter(shp, name == input$guess2)
        
        bearing <- orientation(guess_sf, solution())
        distance <- distance_km(solution(), guess_sf)
        HTML(paste(guess_sf$name, distance, bearing, sep = "  |  "))
        
      })
      
    }
    
    
  })
  
  
  # Intento 3
  observeEvent(input$send_guess3, {
    correcto <- input$guess3 == solution()$name
    
    if(correcto) {
      hide("send_guess3")
      hide("box3")
      show("answer")
      
      show("congrats-msg")
      
      output$answer <- renderUI({
        url <- google_maps_url(solution())
        HTML(paste0("<a href='", url, "' target='_blank'>", solution()$name, "</a>" ))
      })
      
    } else {
      hide("guess3")
      hide("send_guess3")
      hide("box3")
      
      show("clue3")
      show("guess4")
      show("send_guess4")
      
      
      output$clue3 <- renderUI({
        guess_sf <- filter(shp, name == input$guess3)
        
        bearing <- orientation(guess_sf, solution())
        distance <- distance_km(solution(), guess_sf)
        HTML(paste(guess_sf$name, distance, bearing, sep = "  |  "))
        
      })
      
    }
  })
  
  
  # Intento 4
  observeEvent(input$send_guess4, {
    correcto <- input$guess4 == solution()$name
    
    if(correcto) {
      hide("send_guess4")
      hide("box4")
      show("answer")
      
      show("congrats-msg")
      
      output$answer <- renderUI({
        url <- google_maps_url(solution())
        HTML(paste0("<a href='", url, "' target='_blank'>", solution()$name, "</a>" ))
      })
      
    } else {
      hide("guess4")
      hide("send_guess4")
      hide("box4")
      
      show("clue4")
      show("guess5")
      show("send_guess5")
      
      
      output$clue4 <- renderUI({
        guess_sf <- filter(shp, name == input$guess4)
        
        bearing <- orientation(guess_sf, solution())
        distance <- distance_km(solution(), guess_sf)
        HTML(paste(guess_sf$name, distance, bearing, sep = "  |  "))
        
      })
      
    }
  })
  
  # Intento 5
  observeEvent(input$send_guess5, {
    correcto <- input$guess5 == solution()$name
    
    if(correcto) {
      hide("send_guess5")
      hide("box5")
      show("answer")
      
      output$answer <- renderUI({
        url <- google_maps_url(solution())
        HTML(paste0("<a href='", url, "' target='_blank'>", solution()$name, "</a>" ))
      })
      
      show("congrats-msg")
      
    } else {
      hide("guess5")
      hide("send_guess5")
      hide("box5")
      
      show("clue5")
      show("guess6")
      show("send_guess6")
      
      
      output$clue5 <- renderUI({
        guess_sf <- filter(shp, name == input$guess5)
        
        bearing <- orientation(guess_sf, solution())
        distance <- distance_km(solution(), guess_sf)
        HTML(paste(guess_sf$name, distance, bearing, sep = "  |  "))
        
      })
      
    }
  })
  
  
  # Intento 6 (ultimo)
  observeEvent(input$send_guess6, {
    correcto <- input$guess6 == solution()$name
    
    if(correcto) {
      hide("guess6")
      hide("send_guess6")
      hide("box6")
      show("answer")
      
      show("congrats-msg")
      
      output$answer <- renderUI({
        url <- google_maps_url(solution())
        HTML(paste0("<a href='", url, "' target='_blank'>", solution()$name, "</a>" ))
      })
      
    } else {
      hide("guess6")
      hide("send_guess5")
      hide("send_guess6")
      hide("box6")
      
      show("answer")
      
      
      output$answer <- renderUI({
        url <- google_maps_url(solution())
        HTML(paste0("<a href='", url, "' target='_blank'>", solution()$name, "</a>" ))
      })
      
    }
  })
  
}

# Run the application 
shinyApp(ui = ui, server = server)
