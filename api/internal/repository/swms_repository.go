package repository

import (
	"database/sql"
	"encoding/json"
	"log"

	"example.com/internal/models"
)

func CreateSWMS(db *sql.DB, organisation_id int, name string, swms_type string, account_email string, swms_data json.RawMessage) (int, error) {
	const sql = `
	INSERT INTO swms (organisation_id, name, swms_type, created_at, updated_at, account_email)
	VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $4)
	RETURNING id;
	`
	const sql2 = `
	INSERT INTO swms_data (swms_id, data, version)
	VALUES ($1, $2, 1);
	`

	var id int
	err := db.QueryRow(sql, organisation_id, name, swms_type, account_email).Scan(&id)
	if err != nil {
		log.Println("create swms error", err)
		log.Println("create swms params", organisation_id, name, swms_type, account_email)
		return 0, err
	}

	_, err = db.Exec(sql2, id, swms_data)
	if err != nil {

		log.Println("create swms data error", id, err)
		return 0, err
	}

	return id, nil
}

func GetAllByOrg(db *sql.DB, organisation_id string) ([]models.Swms, error) {
	const sql = `
	SELECT *
	FROM swms s
	JOIN swms_data sd ON s.id = sd.swms_id
	WHERE s.organisation_id = $1;
	`

	rows, err := db.Query(sql, organisation_id)
	if err != nil {
		log.Println("get all swms error", err)
		return nil, err
	}

	var swms []models.Swms
	for rows.Next() {
		var s models.Swms
		var sd models.SwmsData
		err := rows.Scan(
			&s.ID,
			&s.OrganisationID,
			&s.Name,
			&s.SwmsType,
			&s.FileName,
			&s.FilePath,
			&s.CreatedAt,
			&s.UpdatedAt,
			&s.AccountEmail,
			&sd.ID,
			&sd.SwmsID,
			&sd.Data,
			&sd.Version,
		)
		if err != nil {
			log.Println("get all swms error", err)
			return nil, err
		}
		s.SwmsData = append(s.SwmsData, sd)
		swms = append(swms, s)
	}
	return swms, nil

}
