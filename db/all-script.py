import csv
import psycopg2
import os

def insert_data_from_csv_driving_school(csv_file, conn):
    try:
        cur = conn.cursor()
        with open(csv_file, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                cur.execute(
                    "INSERT INTO driving_school (uuid,email,name) VALUES (%s, %s, %s)",
                    row
                )
        conn.commit()
        print("Data inserted successfully.")
    except (Exception, psycopg2.Error) as error:
        print("Error inserting data:", error)

def insert_data_from_csv_appointments(csv_file, conn):
    try:
        cur = conn.cursor()
        with open(csv_file, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                if not row[3]:  # Assuming negative_points is at index 3
                    row[3] = None
                if not row[6]:  # Assuming user_embg is at index 6
                    row[6] = None
                cur.execute(
                    "INSERT INTO appointment (uuid,date_time,is_booked,negative_points,location_appointment_type,location_name,user_embg) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    row
                )
        conn.commit()
        print("Data  inserted successfully.")
    except (Exception, psycopg2.Error) as error:
        print("Error inserting data:", error)


def insert_data_from_csv_location(csv_file, conn):
    try:
        cur = conn.cursor()
        with open(csv_file, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                cur.execute(
                    "INSERT INTO location (appointment_type,name) VALUES (%s, %s)",
                    row
                )
        conn.commit()
        print("Data inserted successfully.")
    except (Exception, psycopg2.Error) as error:
        print("Error inserting data:", error)

def insert_data_from_csv_app_user(csv_file, conn):
    try:
        cur = conn.cursor()
        with open(csv_file, 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                cur.execute(
                    "INSERT INTO app_user (birth_date,registration_date,driving_school_uuid,email,embg,last_name,name,password,phone) VALUES (%s, %s,%s, %s,%s, %s,%s, %s,%s)",
                    row
                )
        conn.commit()
        print("Data inserted successfully.")
    except (Exception, psycopg2.Error) as error:
        print("Error inserting data:", error)

try:
    # Connect to PostgreSQL database using environment variables
    conn = psycopg2.connect(
        dbname=os.getenv("POSTGRES_DB"),
        user=os.getenv("POSTGRES_USER"),
        password=os.getenv("POSTGRES_PASSWORD"),
        host="db",
        port="5432"
    )

    # Specify the path to your CSV files for each table
    csv_file_driving_school = "./drivingSchool.csv"
    csv_file_location = "./location.csv"
    csv_file_users = "./users.csv"
    csv_file_appointments = "./appointments.csv"

    # Call the functions to insert data into each table
    insert_data_from_csv_driving_school(csv_file_driving_school, conn)
    insert_data_from_csv_location(csv_file_location, conn)
    insert_data_from_csv_app_user(csv_file_users, conn)
    insert_data_from_csv_appointments(csv_file_appointments, conn)

except (Exception, psycopg2.Error) as error:
    print("Error connecting to PostgreSQL:", error)

finally:
    if 'conn' in locals():
        conn.close()

