-- ============================================
-- Default copy for site_texts
-- ============================================
-- Mirrors the current hardcoded strings on the live site.
-- Safe to re-run: ON CONFLICT (key) DO NOTHING preserves admin edits.

INSERT INTO site_texts (key, page, field_type, label, value, sort_order) VALUES

-- ============== HEADER ==============
('header.cta_text', 'header', 'text', 'CTA-knop tekst', '"let''s goof"'::jsonb, 10),

-- ============== HOME / HERO ==============
('home.hero.headline_lines', 'home', 'list', 'Hero — koptekst (3 regels)',
    '["streven om", "de wereld iets", "echts te geven"]'::jsonb, 10),
('home.hero.paragraph_1', 'home', 'textarea', 'Hero — eerste paragraaf',
    '"Goof brengt merken de wereld in die echt zijn. Geen grote, opgepoetste praatjes en gepolijste perfectie, maar merken met echte verhalen en een eigen, eerlijke uitstraling. Of je je merk nu naar buiten brengt met een rauw randje of een goede knipoog, de wereld snakt naar iets echts. En precies dat is hoe Goof jouw bedrijf of organisatie omtovert tot een merk dat ogen opent."'::jsonb, 20),
('home.hero.paragraph_2', 'home', 'textarea', 'Hero — tweede paragraaf',
    '"Wat is echt? Echt is rauw, echt heeft karakter, echt is knullig, echt is niet perfect, echt is oprecht en echt is wat het is."'::jsonb, 30),

-- ============== OVER ==============
('over.hero.headline_lines', 'over', 'list', 'Over hero — koptekst (3 regels)',
    '["streven om", "de wereld iets", "echts te geven"]'::jsonb, 10),
('over.hero.paragraph_1', 'over', 'textarea', 'Over hero — eerste paragraaf',
    '"Goof brengt merken de wereld in die echt zijn. Geen grote, opgepoetste praatjes en gepolijste perfectie, maar merken met echte verhalen en een eigen, eerlijke uitstraling."'::jsonb, 20),
('over.hero.paragraph_2', 'over', 'textarea', 'Over hero — tweede paragraaf',
    '"Of je je merk nu naar buiten brengt met een rauw randje of een goede knipoog, de wereld snakt naar iets echts. En precies dat is hoe Goof jouw bedrijf of organisatie omtovert tot een merk dat ogen opent."'::jsonb, 30),
('over.hero.paragraph_3', 'over', 'textarea', 'Over hero — derde paragraaf',
    '"Wat is echt? Echt is rauw, echt heeft karakter, echt is knullig, echt is niet perfect, echt is oprecht en echt is wat het is."'::jsonb, 40),
('over.body.title', 'over', 'text', 'Over Goof — titel', '"over goof"'::jsonb, 50),
('over.body.intro', 'over', 'textarea', 'Over Goof — intro', '""'::jsonb, 60),
('over.body.body1', 'over', 'textarea', 'Over Goof — paragraaf 1', '""'::jsonb, 70),
('over.body.body2', 'over', 'textarea', 'Over Goof — paragraaf 2', '""'::jsonb, 80),
('over.body.image_url', 'over', 'url', 'Over Goof — foto URL', '""'::jsonb, 90),

-- ============== DIENSTEN — TILES ==============
('diensten.tiles.section_title', 'diensten', 'text', 'Diensten sectie titel', '"diensten"'::jsonb, 10),
('diensten.tiles.branding_title', 'diensten', 'text', 'Tegel — Branding titel', '"branding"'::jsonb, 20),
('diensten.tiles.branding_text', 'diensten', 'textarea', 'Tegel — Branding tekst',
    '"Praatjes vullen geen gaatjes. Een branding daarentegen wel. Met een branding laat je in één oogopslag zien wie je bent en waar je voor staat."'::jsonb, 30),
('diensten.tiles.grafisch_title', 'diensten', 'text', 'Tegel — Grafisch ontwerp titel', '"grafisch ontwerp"'::jsonb, 40),
('diensten.tiles.grafisch_text', 'diensten', 'textarea', 'Tegel — Grafisch ontwerp tekst',
    '"Met grafisch ontwerp krijgt jouw branding vorm. Dit is wat je doelgroep gaat zien! Denk aan een poster voor je cursus stadsduiven-fotografie, of een t-shirt om je huisgemaakte kroketten mee te promoten. Onmisbaar om jouw doelgroep te bereiken."'::jsonb, 50),
('diensten.tiles.webdesign_title', 'diensten', 'text', 'Tegel — Webdesign titel', '"webdesign"'::jsonb, 60),
('diensten.tiles.webdesign_text', 'diensten', 'textarea', 'Tegel — Webdesign tekst',
    '"Een website is niet zomaar een online visitekaartje - het is een essentieel onderdeel van de klantreis. Van de structuur tot de gebruiksvriendelijkheid, elk detail moet kloppen om je doelgroep de beste merkervaring te geven."'::jsonb, 70),

-- ============== DIENSTEN — DETAIL (werkwijze) ==============
('diensten.detail.title', 'diensten', 'text', 'Werkwijze — titel', '"werkwijze"'::jsonb, 100),
('diensten.detail.intro', 'diensten', 'textarea', 'Werkwijze — intro',
    '"Hieronder wordt in grote lijnen de werkwijze van Goof omschreven. In sommige gevallen kan worden afgeweken van de standaard werkwijze. Een creatief proces laat zich immers niet altijd vangen door een vast stramien. Misschien vraagt jouw situatie net om een andere aanpak. Hoe dan ook: het gehele proces wordt altijd duidelijk besproken in de offerte, zodat voor beide partijen duidelijk is wat de verwachtingen zijn."'::jsonb, 110),

-- Branding workflow card
('diensten.detail.branding.title', 'diensten', 'text', 'Branding kaart — titel', '"branding"'::jsonb, 120),
('diensten.detail.branding.step1_text', 'diensten', 'textarea', 'Branding 1. kennismaking',
    '"Tijdens het kennismakingsgesprek bespreken we je wensen, maar ook wat er nodig is om jouw merk de uitstraling te geven die het verdient. Dit gesprek is altijd gratis!"'::jsonb, 121),
('diensten.detail.branding.step3_text', 'diensten', 'textarea', 'Branding 3. intake',
    '"Tijdens het intakegesprek gaan we dieper in op het merk. Waar staat het merk voor? Alles komt aan bod: van identiteit en doelgroepen tot het eerste richtingsgevoel voor een huisstijl."'::jsonb, 122),
('diensten.detail.branding.step4_text', 'diensten', 'textarea', 'Branding 4. concepting en visuele verkenning',
    '"Nu ga ik los. Onderzoek, brainstormen, schetsen, doorkrassen, nog meer brainstormen, moodboards. Ik zal regelmatig met je terugkoppelen, zoals besproken in de offerte."'::jsonb, 123),
('diensten.detail.branding.step5_text', 'diensten', 'textarea', 'Branding 5. oplevering',
    '"Het gevoel zit goed, het brandbook kan worden opgemaakt. Het is een leidraad met alles wat je moet weten over de identiteit en huisstijl van jouw merk."'::jsonb, 124),
('diensten.detail.branding.footer', 'diensten', 'textarea', 'Branding — afsluiter',
    '"Nog niet klaar met me? Aan de hand van de nieuwe branding neem ik je maar al te graag mee in de wereld van grafisch ontwerp of webdesign!"'::jsonb, 125),

-- Grafisch ontwerp workflow card
('diensten.detail.grafisch.title', 'diensten', 'text', 'Grafisch kaart — titel', '"grafisch ontwerp"'::jsonb, 130),
('diensten.detail.grafisch.step1_text', 'diensten', 'textarea', 'Grafisch 1. kennismaking',
    '"Tijdens het kennismakingsgesprek bespreken we je wensen. Welke vormen van grafisch ontwerp zijn er nodig om je doel te bereiken? Dit gesprek is altijd gratis!"'::jsonb, 131),
('diensten.detail.grafisch.step3_text', 'diensten', 'textarea', 'Grafisch 3. ontwerpfase',
    '"Aan de hand van de uitkomsten van het kennismakingsgesprek ga ik aan de slag met het ontwerp. Als het nodig is zal er van te voren een conceptvoorstel worden aangeboden. Ik zal in deze fase regelmatig met je terugkoppelen, zoals besproken in de offerte."'::jsonb, 132),
('diensten.detail.grafisch.step4_text', 'diensten', 'textarea', 'Grafisch 4. oplevering en drukwerk',
    '"Wanneer je helemaal tevreden bent lever ik het ontwerp op in de juiste bestandsformaten. Geen zin in drukwerk gedoe? Snap ik. Ik ook niet. Maar ik doe het graag voor je :)"'::jsonb, 133),
('diensten.detail.grafisch.types_title', 'diensten', 'text', 'Grafisch — soorten titel',
    '"Waar moet ik aan denken bij grafisch ontwerp?"'::jsonb, 134),
('diensten.detail.grafisch.types_list', 'diensten', 'list', 'Grafisch — soorten lijst',
    '["Posters","Banners","Flyers","Documentopmaak","Folders","Magazines en boeken","Package design","Illustraties","Visitekaartjes","Geboortekaartjes","Merchandise","Uitnodigingen"]'::jsonb, 135),

-- Webdesign workflow card
('diensten.detail.webdesign.title', 'diensten', 'text', 'Webdesign kaart — titel', '"webdesign"'::jsonb, 140),
('diensten.detail.webdesign.step1_text', 'diensten', 'textarea', 'Webdesign 1. kennismaking',
    '"Tijdens het kennismakingsgesprek bespreken we je wensen. Wat voor website is er nodig? Is er al een huisstijl? Lever je zelf teksten en fotografie aan of wil je dit laten uitbesteden? Dit gesprek is altijd gratis!"'::jsonb, 141),
('diensten.detail.webdesign.step3_text', 'diensten', 'textarea', 'Webdesign 3. tweede gesprek',
    '"Tijdens een tweede gesprek gaan we samen dieper in op de inhoud van de website. Welke elementen zijn onmisbaar om jouw doelgroep de beste ervaring te geven?"'::jsonb, 142),
('diensten.detail.webdesign.step4_text', 'diensten', 'textarea', 'Webdesign 4. webdesign',
    '"Het ontwerpen kan vast start gaan. Er wordt aandacht besteed aan de UI (user interface) en UX (user experience) van de website. Belangrijke zaken zoals de structuur van de website, maar ook de overall ''look and feel'' worden regelmatig teruggekoppeld, zoals besproken in de offerte."'::jsonb, 143),
('diensten.detail.webdesign.step5_text', 'diensten', 'textarea', 'Webdesign 5. back-end development',
    '"Het webdesign staat? Dan is het tijd voor de ontwikkeling. De website wordt omgezet naar een functionele site, waarbij alles wat je ziet ook echt werkt. Denk aan formulieren, animaties en een gebruiksvriendelijk contentmanagementsysteem (CMS) waarmee je zelf content kunt aanpassen."'::jsonb, 144),

-- ============== WERK ==============
('werk.title', 'werk', 'text', 'Werk pagina — titel', '"Werk"'::jsonb, 10),
('werk.empty_text', 'werk', 'text', 'Werk pagina — leeg bericht', '"Geen projecten gevonden."'::jsonb, 20),

-- ============== CONTACT ==============
('contact.hero.title', 'contact', 'text', 'Contact — titel', '"kennismaken?"'::jsonb, 10),
('contact.hero.subtitle_line1', 'contact', 'text', 'Contact — subtitel regel 1', '"leuk! neem contact op en we"'::jsonb, 20),
('contact.hero.subtitle_line2', 'contact', 'text', 'Contact — subtitel regel 2', '"plannen een gesprek."'::jsonb, 30),
('contact.hero.email', 'contact', 'email', 'Contact — e-mail', '"info@goof.design"'::jsonb, 40),
('contact.hero.phone', 'contact', 'tel', 'Contact — telefoon', '"+31 6 24576082"'::jsonb, 50),
('contact.boring.kvk', 'contact', 'text', 'Boring stuff — KVK', '"KVK: 90939670"'::jsonb, 60),
('contact.boring.btw', 'contact', 'text', 'Boring stuff — BTW', '"BTW: NL004067438B58"'::jsonb, 70),
('contact.boring.iban', 'contact', 'text', 'Boring stuff — IBAN', '"IBAN: NL89 KNAB 0776 3092 85"'::jsonb, 80),
('contact.form.title', 'contact', 'text', 'Formulier — titel', '"of stuur een bericht via het formulier"'::jsonb, 90),
('contact.form.subtitle', 'contact', 'textarea', 'Formulier — subtitel',
    '"en ik neem zo snel mogelijk contact met je op!"'::jsonb, 100),
('contact.form.success_title', 'contact', 'text', 'Formulier — succes titel', '"bedankt voor je bericht!"'::jsonb, 110),
('contact.form.success_text', 'contact', 'text', 'Formulier — succes tekst',
    '"ik neem zo snel mogelijk contact met je op."'::jsonb, 120),

-- ============== FOOTER ==============
('footer.cta_title', 'footer', 'text', 'Footer — CTA titel', '"samenwerken?"'::jsonb, 10),
('footer.cta_text', 'footer', 'textarea', 'Footer — CTA tekst',
    '"Neem contact op voor een vrijblijvende offerte, een kennismakingsgesprek, of als je gewoon een vraag hebt!"'::jsonb, 20),
('footer.email', 'footer', 'email', 'Footer — e-mail', '"info@goof.design"'::jsonb, 30),
('footer.phone', 'footer', 'tel', 'Footer — telefoon', '"+31 6 24576082"'::jsonb, 40),
('footer.instagram_handle', 'footer', 'text', 'Footer — Instagram handle', '"@goofdesign.nl"'::jsonb, 50),
('footer.address', 'footer', 'textarea', 'Footer — adres', '"Oosterweg 87,\nGroningen"'::jsonb, 60),
('footer.linkedin_url', 'footer', 'url', 'Footer — LinkedIn URL', '"https://www.linkedin.com/company/106263260"'::jsonb, 70),
('footer.instagram_url', 'footer', 'url', 'Footer — Instagram URL', '"https://www.instagram.com/goofdesign.nl"'::jsonb, 80)

ON CONFLICT (key) DO NOTHING;
