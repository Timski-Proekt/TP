# Use a base image with Python installed
FROM python:3-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the Python script and dependencies into the container
COPY . /app/

# Install PostgreSQL client libraries and build dependencies
RUN apk add --no-cache postgresql-libs && \
    apk add --no-cache --virtual .build-deps gcc musl-dev postgresql-dev

# Install Python dependencies
RUN python3 -m pip install -r requirements.txt --no-cache-dir

# Clean up build dependencies
RUN apk del .build-deps

# Copy the wait-for-it.sh script into the container
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Grant execution permissions to the script
RUN chmod +x /usr/local/bin/wait-for-it.sh


RUN apk add --no-cache bash
# Specify the command to run the Python script after the database is ready
CMD ["sh", "-c", "/usr/local/bin/wait-for-it.sh backend:8080 -- python all-script.py"]
