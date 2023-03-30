const puppeteer = require('puppeteer');
const { parse, format } = require('date-fns');
const { utcToZonedTime } = require('date-fns-tz');
const frLocale = require('date-fns/locale/fr');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('');

    // Cliquez sur le bouton suivant sur la première page
    await page.click('button.form-next');

    // Remplissez les champs du formulaire sur la page 2
    await page.waitForSelector('input[name="f29"]');
    await page.click('input[name="f29"][value=""]');
    await page.type('input[name="f30"]', '');
    await page.type('input[name="f31"]', '');
    await page.type('input[name="f158"]', '');
    await page.type('input[name="f38"]', '');
    await page.click('input[name="f135"][value="cni"]');
    await page.click('input[name="f136"][value="1pers"]');

    // Cliquez sur le bouton suivant pour passer à la page 3
    await page.click('button.form-next');

    // Cochez la case "Mairie de Tours" et attendez que les créneaux horaires apparaissent
    await page.waitForSelector('input[name="f152"][value="centre"]');
    await page.click('input[name="f152"][value="centre"]');
    let firstDateFound = false;

    // Boucle pour vérifier les créneaux disponibles chaque minute (60000 ms)
    while (true) {
        await page.waitForTimeout(15000);
        await page.reload();

        // Cochez la case "Mairie de Tours" et attendez que les créneaux horaires apparaissent
        await page.waitForSelector('input[name="f152"][value="centre"]');
        await page.click('input[name="f152"][value="centre"]');

        try {
            await page.waitForSelector('div.head', { timeout: 5000 });
        } catch (error) {
            console.log('Aucun créneau trouvé, actualisation dans 1 minute.');
            continue;
        }

        const dateElements = await page.$$('div.head');
        const timeElements = await page.$$('span.timetable-cell.selectable');
        let firstDate = null;
        let slotFound = false;


        for (const [index, dateElement] of dateElements.entries()) {
            let dateText = await dateElement.evaluate(el => el.textContent);
            const timeText = await timeElements[index].evaluate(el => el.textContent);

            // Insérer un espace entre le jour de la semaine et le jour du mois
            dateText = dateText.replace(/(\D)(\d)/, "$1 $2");

            // Utiliser date-fns pour analyser la date
            const date = parse(dateText, "EEEE d MMMM yyyy HH:mm", new Date(), { locale: frLocale });

            // Convertir la date en heure UTC
            const currentDate = new Date();
            const zonedDate = utcToZonedTime(date, "UTC");

            // console.log("Current date: ", currentDate);
            if (zonedDate <= currentDate) {
                continue;
            }

            if (!firstDate) {
                firstDate = zonedDate;
            }
            const weekDifference = (zonedDate - currentDate) / (1000 * 60 * 60 * 24 * 7);
            if (weekDifference >= 0 && weekDifference < 2) {
                console.log('Créneau disponible dans les 2 semaines :', format(zonedDate, "EEEE d MMMM yyyy HH:mm", { locale: frLocale }));
                await timeElements[index].click();
                await page.waitForSelector('button[name="submit"][value="Valider"]');
                await page.click('button[name="submit"][value="Valider"]');
                slotFound = true;
                break;
            }
        }




        if (slotFound) {
            break;
        }

        if (!firstDateFound && firstDate) {
            console.log("Aucun créneau disponible cette semaine, premier créneau trouvé :", firstDate);
        }
    }

})();
