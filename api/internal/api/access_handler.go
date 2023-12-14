package api

import (
	"encoding/json"
	"net/http"

	"example.com/internal/repository"
	"github.com/gorilla/mux"
)

func (api *APIHandler) UserAccessHandler(w http.ResponseWriter, r *http.Request) {

	// Get the user email and software id from the query parameters
	vars := mux.Vars(r)
	var email string
	var softwareId string
	var err error
	email, ok := vars["email"]
	if !ok {
		http.Error(w, "Email is required", http.StatusBadRequest)
		return
	}
	softwareId, ok = vars["softwareId"]
	if !ok {
		http.Error(w, "Software ID is required", http.StatusBadRequest)
		return
	}

	if err != nil {
		// Handle the error
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Call the repository function
	userAccessResponse, err := repository.GetUserOrganisationAndSoftwareAccess(api.DB, email, softwareId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with the user access response
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(userAccessResponse)
}
