from flask import Flask, render_template_string, request
import folium

app = Flask(__name__)

# HTML page with browser Geolocation API
HTML = """
<!DOCTYPE html>
<html>
  <head>
    <title>Get Location</title>
  </head>
  <body>
    <h2>Click the button to share your location</h2>
    <button onclick="getLocation()">Get My Location</button>
    <p id="output"></p>

    <script>
      function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
          document.getElementById("output").innerHTML = "Geolocation not supported.";
        }
      }

      function showPosition(position) {
        fetch("/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }).then(res => res.text()).then(msg => {
          document.getElementById("output").innerHTML = msg;
        });
      }

      function showError(error) {
        document.getElementById("output").innerHTML = "Error: " + error.message;
      }
    </script>
  </body>
</html>
"""

@app.route("/")
def index():
    return render_template_string(HTML)

@app.route("/location", methods=["POST"])
def location():
    data = request.get_json()
    lat, lng = data["lat"], data["lng"]

    # Print coordinates to terminal
    print(f"User clicked Get Location → Latitude: {lat}, Longitude: {lng}")

    # Optional: create a map file
    myMap = folium.Map(location=[lat, lng], zoom_start=15)
    folium.Marker([lat, lng], popup="You are here").add_to(myMap)
    myMap.save("mylocation.html")

    return f"Location received! Check terminal for coordinates and 'mylocation.html' for map."

if __name__ == "__main__":
    app.run(port=5000, debug=True)
