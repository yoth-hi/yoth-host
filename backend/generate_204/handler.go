package generate_204

import (
	"net/http"
)

// Handler retorna um status 204 No Content
func Handler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNoContent)
}