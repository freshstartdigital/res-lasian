package models

import "time"

type User struct {
	ID            int       `json:"id"`
	Name          string    `json:"name"`
	Email         string    `json:"email"`
	EmailVerified time.Time `json:"emailVerified,omitempty"`
	Image         string    `json:"image,omitempty"`
}
