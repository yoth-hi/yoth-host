package main

import (
    "fmt"
    "io/ioutil"
    "yo/backend/generate_204"
    "net/http" // Add this import for HTTP functionality
)

func handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Strict-Transport-Security", "max-age=31536000")
    w.Header().Set("X-Content-Type-Options", "nosniff")
    w.Header().Set("X-Frame-Options", "SAMEORIGIN")
    w.Header().Set("X-Xss-Protection", "0")
    content, err := ioutil.ReadFile("frontend/desktop/build/shady/index.html")
    if err != nil {
        fmt.Println("Error reading file:", err)
        return
    }
    // Envie o conteúdo sem compressão
    w.Write(content)
}

func main() {
    fs := http.FileServer(http.Dir("frontend/desktop")) // "static" é o diretório onde seus arquivos estáticos estão localizados
    http.Handle("/s/", http.StripPrefix("/s/", fs))

    http.HandleFunc("/", handler)
    http.HandleFunc("/generate_204", generate_204.Handler)
    http.ListenAndServe(":8080", nil)
}