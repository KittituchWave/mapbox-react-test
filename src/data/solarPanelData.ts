export const solarPanelMarkers: {
    id: number;
    longitude: number;
    latitude: number;
    title: string;
    status: string;
    description: string;
    location: string;
    severity: "warning" | "normal";
  }[] = [
    {
        "id": 1,
        "longitude": 100.538311,
        "latitude": 13.723058,
        "title": "Panel-01",
        "status": "operational",
        "description": "All systems operational sector 2 #A813",
        "location": "Sector 1, North Wing",
        "severity": "normal"
      },
      {
        "id": 2,
        "longitude": 100.535947,
        "latitude": 13.720866,
        "title": "Panel-02",
        "status": "high-temp",
        "description": "Overheating detected in sector 4 #A490",
        "location": "Sector 1, North Wing",
        "severity": "warning"
      },
      {
        "id": 3,
        "longitude": 100.536208,
        "latitude": 13.73726,
        "title": "Panel-03",
        "status": "voltage-issue",
        "description": "Overheating detected in sector 2 #A433",
        "location": "Sector 4, North Wing",
        "severity": "warning"
      },
      {
        "id": 4,
        "longitude": 100.543119,
        "latitude": 13.732773,
        "title": "Panel-04",
        "status": "high-temp",
        "description": "Overheating detected in sector 5 #A748",
        "location": "Sector 5, East Wing",
        "severity": "warning"
      },
      {
        "id": 5,
        "longitude": 100.538668,
        "latitude": 13.73983,
        "title": "Panel-05",
        "status": "operational",
        "description": "All systems operational sector 2 #A589",
        "location": "Sector 2, North Wing",
        "severity": "normal"
      },
      {
        "id": 6,
        "longitude": 100.536709,
        "latitude": 13.73793,
        "title": "Panel-06",
        "status": "operational",
        "description": "All systems operational sector 1 #A690",
        "location": "Sector 2, North Wing",
        "severity": "normal"
      },
      {
        "id": 7,
        "longitude": 100.540973,
        "latitude": 13.738091,
        "title": "Panel-07",
        "status": "operational",
        "description": "All systems operational sector 1 #A536",
        "location": "Sector 1, East Wing",
        "severity": "normal"
      },
      {
        "id": 8,
        "longitude": 100.531321,
        "latitude": 13.73294,
        "title": "Panel-08",
        "status": "operational",
        "description": "All systems operational sector 2 #A593",
        "location": "Sector 1, East Wing",
        "severity": "normal"
      },
      {
        "id": 9,
        "longitude": 100.539941,
        "latitude": 13.720553,
        "title": "Panel-09",
        "status": "operational",
        "description": "All systems operational sector 2 #A859",
        "location": "Sector 1, North Wing",
        "severity": "normal"
      },
      {
        "id": 10,
        "longitude": 100.550993,
        "latitude": 13.720829,
        "title": "Panel-10",
        "status": "operational",
        "description": "All systems operational sector 1 #A306",
        "location": "Sector 4, North Wing",
        "severity": "normal"
      }
    // Add more panels as needed
  ];
  