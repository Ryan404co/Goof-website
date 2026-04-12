<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Werkwijze</title>
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

        .workflow-section {
            padding: 80px 10px;
            margin: 0;
        }

        .workflow-container {
            max-width: 1400px;
            margin: 0 auto;
        }

        .workflow-header {
            margin-bottom: 40px;
        }

        .workflow-header h1 {
            color: #4A5B4C;
            font-size: 3rem;
            margin-bottom: 20px;
            font-weight: 600;
        }

        .workflow-intro {
            color: #4A5B4C;
            font-size: 1rem;
            line-height: 1.8;
            max-width: 1200px;
        }

        .workflow-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }

        .workflow-card {
            background-color: #FDFF96;
            border-radius: 20px;
            padding: 40px;
        }

        .workflow-card h2 {
            color: #4A5B4C;
            font-size: 2rem;
            margin-bottom: 30px;
            font-weight: 600;
        }

        .workflow-step {
            margin-bottom: 25px;
        }

        .workflow-step h3 {
            color: #4A5B4C;
            font-size: 1.1rem;
            margin-bottom: 10px;
            font-weight: 600;
        }

        .workflow-step p {
            color: #4A5B4C;
            line-height: 1.6;
            font-size: 0.95rem;
        }

        .design-types {
            margin-top: 20px;
        }

        .design-types h4 {
            color: #4A5B4C;
            font-size: 1rem;
            margin-bottom: 15px;
            font-weight: 600;
        }

        .design-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .design-list p {
            color: #4A5B4C;
            font-size: 0.9rem;
        }

        .workflow-footer {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid rgba(74, 91, 76, 0.2);
        }

        .workflow-footer p {
            color: #4A5B4C;
            line-height: 1.6;
            font-size: 0.95rem;
        }

        @media (max-width: 1024px) {
            .workflow-cards {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 900px) {
            .workflow-section {
                padding: 60px 1.5rem;
            }

            .workflow-header h1 {
                font-size: 2.75rem;
            }

            .workflow-card {
                padding: 35px;
            }
        }

        @media (max-width: 768px) {
            .workflow-section {
                padding: 40px 1rem;
            }

            .workflow-header h1 {
                font-size: 2.5rem;
            }

            .workflow-card {
                padding: 30px;
            }

            .workflow-card h2 {
                font-size: 1.8rem;
            }

            .design-list {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 600px) {
            .workflow-section {
                padding: 35px 1rem;
            }

            .workflow-header h1 {
                font-size: 2.25rem;
            }

            .workflow-card {
                padding: 26px;
                border-radius: 16px;
            }

            .workflow-card h2 {
                font-size: 1.6rem;
                margin-bottom: 25px;
            }
        }

        @media (max-width: 480px) {
            .workflow-section {
                padding: 30px 1rem;
            }

            .workflow-header h1 {
                font-size: 2rem;
            }

            .workflow-card {
                padding: 24px;
                border-radius: 16px;
            }

            .workflow-card h2 {
                font-size: 1.5rem;
                margin-bottom: 20px;
            }

            .workflow-step {
                margin-bottom: 20px;
            }

            .workflow-step h3 {
                font-size: 1rem;
            }

            .workflow-step p,
            .workflow-card p {
                font-size: 0.9rem;
            }

            .design-list {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <section class="workflow-section">
        <div class="workflow-container">
        <div class="workflow-header">
            <h1>werkwijze</h1>
            <p class="workflow-intro">Hieronder wordt in grote lijnen de werkwijze van Goof omschreven. In sommige gevallen kan worden afgeweken van de standaard werkwijze. Een creatief proces laat zich immers niet altijd vangen door een vast stramien. Misschien vraagt jouw situatie net om een andere aanpak. Hoe dan ook: het gehele proces wordt altijd duidelijk besproken in de offerte, zodat voor beide partijen duidelijk is wat de verwachtingen zijn.</p>
        </div>

        <div class="workflow-cards">
            <!-- Branding Card -->
            <div class="workflow-card">
                <h2>branding</h2>
                
                <div class="workflow-step">
                    <h3>1. kennismaking</h3>
                    <p>Tijdens het kennismakingsgesprek bespreken we je wensen, maar ook wat er nodig is om jouw merk de uitstraling te geven die het verdient. Dit gesprek is altijd gratis!</p>
                </div>

                <div class="workflow-step">
                    <h3>2. offerte</h3>
                </div>

                <div class="workflow-step">
                    <h3>3. intake</h3>
                    <p>Tijdens het intakegesprek gaan we dieper in op het merk. Waar staat het merk voor? Alles komt aan bod: van identiteit en doelgroepen tot het eerste richtingsgevoel voor een huisstijl.</p>
                </div>

                <div class="workflow-step">
                    <h3>4. concepting en visuele verkenning</h3>
                    <p>Nu ga ik los. Onderzoek, brainstormen, schetsen, doorkrassen, nog meer brainstormen, moodboards. Ik zal regelmatig met je terugkoppelen, zoals besproken in de offerte.</p>
                </div>

                <div class="workflow-step">
                    <h3>5. oplevering</h3>
                    <p>Het gevoel zit goed, het brandbook kan worden opgemaakt. Het is een leidraad met alles wat je moet weten over de identiteit en huisstijl van jouw merk.</p>
                </div>

                <div class="workflow-footer">
                    <p>Nog niet klaar met me? Aan de hand van de nieuwe branding neem ik je maar al te graag mee in de wereld van grafisch ontwerp of webdesign!</p>
                </div>
            </div>

            <!-- Grafisch Ontwerp Card -->
            <div class="workflow-card">
                <h2>grafisch ontwerp</h2>
                
                <div class="workflow-step">
                    <h3>1. kennismaking</h3>
                    <p>Tijdens het kennismakingsgesprek bespreken we je wensen. Welke vormen van grafisch ontwerp zijn er nodig om je doel te bereiken? Dit gesprek is altijd gratis!</p>
                </div>

                <div class="workflow-step">
                    <h3>2. offerte</h3>
                </div>

                <div class="workflow-step">
                    <h3>3. ontwerpfase</h3>
                    <p>Aan de hand van de uitkomsten van het kennismakingsgesprek ga ik aan de slag met het ontwerp. Als het nodig is zal er van te voren een conceptvoorstel worden aangeboden. Ik zal in deze fase regelmatig met je terugkoppelen, zoals besproken in de offerte.</p>
                </div>

                <div class="workflow-step">
                    <h3>4. oplevering en drukwerk</h3>
                    <p>Wanneer je helemaal tevreden bent lever ik het ontwerp op in de juiste bestandsformaten. Geen zin in drukwerk gedoe? Snap ik. Ik ook niet. Maar ik doe het graag voor je :)</p>
                </div>

                <div class="design-types">
                    <h4>Waar moet ik aan denken bij grafisch ontwerp?</h4>
                    <div class="design-list">
                        <p>Posters</p>
                        <p>Banners</p>
                        <p>Flyers</p>
                        <p>Documentopmaak</p>
                        <p>Folders</p>
                        <p>Magazines en boeken</p>
                        <p>Package design</p>
                        <p>Illustraties</p>
                        <p>Visitekaartjes</p>
                        <p>Geboortekaartjes</p>
                        <p>Merchandise</p>
                        <p>Uitnodigingen</p>
                    </div>
                </div>
            </div>

            <!-- Webdesign Card -->
            <div class="workflow-card">
                <h2>webdesign</h2>
                
                <div class="workflow-step">
                    <h3>1. kennismaking</h3>
                    <p>Tijdens het kennismakingsgesprek bespreken we je wensen. Wat voor website is er nodig? Is er al een huisstijl? Lever je zelf teksten en fotografie aan of wil je dit laten uitbesteden? Dit gesprek is altijd gratis!</p>
                </div>

                <div class="workflow-step">
                    <h3>2. offerte</h3>
                </div>

                <div class="workflow-step">
                    <h3>3. tweede gesprek</h3>
                    <p>Tijdens een tweede gesprek gaan we samen dieper in op de inhoud van de website. Welke elementen zijn onmisbaar om jouw doelgroep de beste ervaring te geven?</p>
                </div>

                <div class="workflow-step">
                    <h3>4. webdesign</h3>
                    <p>Het ontwerpen kan vast start gaan. Er wordt aandacht besteed aan de UI (user interface) en UX (user experience) van de website. Belangrijke zaken zoals de structuur van de website, maar ook de overall 'look and feel' worden regelmatig teruggekoppeld, zoals besproken in de offerte.</p>
                </div>

                <div class="workflow-step">
                    <h3>5. back-end development</h3>
                    <p>Het webdesign staat? Dan is het tijd voor de ontwikkeling. De website wordt omgezet naar een functionele site, waarbij alles wat je ziet ook echt werkt. Denk aan formulieren, animaties en een gebruiksvriendelijk contentmanagementsysteem (CMS) waarmee je zelf content kunt aanpassen.</p>
                </div>
            </div>
        </div>
        </div>
    </section>
</body>
</html>