<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diensten</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Outfit', sans-serif;
            background-color: #f5f5f5;
        }

        .services-section {
            background-color: #4A5B4C;
            padding: 120px 10px;
        }

        .services-wrapper {
            max-width: 1400px;
            margin: 0 auto;
        }

        .section-title {
            color: #FDFF96;
            font-size: 2.5rem;
            font-weight: 500;
            margin-bottom: 20px;
            text-align: left;
        }

        .services-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
        }

        .service-wrapper {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .service-card {
            background-color: transparent;
            border: 1px solid #FDFF96;
            border-radius: 20px;
            padding: 40px;
            transition: transform 0.3s ease;
            flex-grow: 1;
        }

        .service-wrapper:hover .service-card {
            transform: translateY(-5px);
        }

        .service-card h2 {
            color: #FDFF96;
            font-size: 2rem;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .service-card p {
            color: #FDFF96;
            line-height: 1.6;
            margin-bottom: 0;
            font-size: 1rem;
        }

        .service-button {
            display: inline-block;
            background-color: #FDFF96;
            color: #4A5B4C;
            padding: 15px 40px;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 500;
            transition: filter 0.2s ease;
            align-self: flex-start;
        }

        .service-button:hover {
            filter: brightness(0.95);
        }

        @media (max-width: 900px) {
            .services-section {
                padding: 80px 1.5rem;
            }

            .services-container {
                grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                gap: 30px;
            }

            .service-card {
                padding: 35px;
            }
        }

        @media (max-width: 768px) {
            .services-section {
                padding: 40px 1rem;
            }

            .services-container {
                gap: 30px;
            }

            .service-card {
                padding: 30px;
            }

            .service-card h2 {
                font-size: 1.5rem;
            }
        }

        @media (max-width: 600px) {
            .services-section {
                padding: 35px 1rem;
            }

            .service-card {
                padding: 28px;
                border-radius: 16px;
            }

            .service-card h2 {
                font-size: 1.4rem;
            }

            .section-title {
                font-size: 2rem;
            }
        }

        @media (max-width: 480px) {
            .services-section {
                padding: 30px 1rem;
            }

            .service-card {
                padding: 24px;
            }

            .service-card h2 {
                font-size: 1.35rem;
            }

            .service-button {
                padding: 12px 35px;
                font-size: 0.95rem;
            }
        }
    </style>
</head>
<body>
    <section class="services-section">
        <div class="services-wrapper">
            <h2 class="section-title">diensten</h2>
            <div class="services-container">
                <div class="service-wrapper">
                <div class="service-card">
                    <h2>branding</h2>
                    <p>Praatjes vullen geen gaatjes. Een branding daarentegen wel. Met een branding laat je in één oogopslag zien wie je bent en waar je voor staat.</p>
                </div>
            </div>

            <div class="service-wrapper">
                <div class="service-card">
                    <h2>grafisch ontwerp</h2>
                    <p>Met grafisch ontwerp krijgt jouw branding vorm. Dit is wat je doelgroep gaat zien! Denk aan een poster voor je cursus stadsduiven-fotografie, of een t-shirt om je huisgemaakte kroketten mee te promoten. Onmisbaar om jouw doelgroep te bereiken.</p>
                </div>
            </div>

            <div class="service-wrapper">
                <div class="service-card">
                    <h2>webdesign</h2>
                    <p>Een website is niet zomaar een online visitekaartje - het is een essentieel onderdeel van de klantreis. Van de structuur tot de gebruiksvriendelijkheid, elk detail moet kloppen om je doelgroep de beste merkervaring te geven.</p>
                </div>
            </div>
        </div>
        </div>
    </section>
</body>
</html>