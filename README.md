# HEOR Productivity PWA

A Progressive Web App (PWA) built with **Next.js (App Router)** to visualize and explore productivity metrics.  
The app works offline once installed and can be added to a user’s home screen on mobile devices (iOS/Android).

**Live demo:** https://heor-data-visualisation.vercel.app/

---

## Features

-   **Month View** - A line graph displaying productivity over time. Individual data points can be editted by tapping/clicking on one and adjusting the sliders below.
-   **Range View** - A bar graph displaying `hours_worked`, `break_minutes` (converted to hours) and `focus_level`. Data is displayed from a 7 day period with the most recent as default. The date range can be changed by using the calendar input to select a new start date for the 7 day period.
-   **CSV Dataset** - The CSV dataset is used to calculate the productivity score and display the initial values on the line graph while providing all values displayed on the bar graph.
-   **PWA** - This Web App can be added to your mobile phone homescreen and then used offline.
-   **Responsive Design** - Designed to look pclean and professional on both desktop and mobile screens.

---

## Technology Used

### Tech Stack

-   [Next.js 15 (App Router)](https://nextjs.org/)
-   [React](https://react.dev/)
-   [Sass (SCSS Modules)](https://sass-lang.com/)
-   [PWA setup with custom service worker](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
-   Deployed on [Vercel](https://vercel.com/)
-   LIVE DEMO - https://heor-data-visualisation.vercel.app/

### Npm Libraries

-   [Chart.js + react-chartjs-2](https://react-chartjs-2.js.org/)
-   [date-fns](https://date-fns.org/)
-   [react-date-range](https://github.com/hypeserver/react-date-range)
-   [React Icons](https://react-icons.github.io/react-icons/)

---

## How to use

### 1. Clone this repository to your machine

```
git clone https://github.com/RobGrimes8/heor-data-visualisation
```

### 2. Install dependencies

```
npm install
```

### 3. Run development server

```
npm run dev
```

### 4. Build for prod

```
npm run build
npm run start
```

---

## PWA Information

-   A custom service worker handles caches necessary routes on install so they are available offline.
-   The service worker is registered in the app layout file using the `ServiceWorkerRegister` component.
-   `mannifest.json` defines PWA settings such as name, icon and themes.

---

## Assumptions

-   Break minutes
    -   Max of 120 min and steps in increments of 15 mins.
    -   Can exceed hours worked (assuming break minutes aren't included in hours worked)
-   Productivity score
    -   Values in CSV are incorrect when using the formula provided `(hours_worked×10)+(focus_level×5)−(break_minutes×0.5)`
    -   Has a minimum of 0.
-   If hours worked are 0, productivity score = 0.
-   Real data for production would include data for every day e.g. weekends.

## Difficulties

-   Bar charts on mobile phone particularly tricky with ChartJS. Due to this, I:
    -   made the decision to reduce the days visible in the bar chart to 7.
    -   used a horizontal bar chart to allow more space to display the data.
-   iOS does not respect min and max values on date inputs.
    -   react-date-range was used instead to accomplish this.
-   PWA's installed via safari on iPhone must installed via **HTTPS** or `http://localhost` to allow functionality like offline access.
    -   I deployed the project on vercel to allow easy access and the ability to install the PWA to your homescreen and access offline.
