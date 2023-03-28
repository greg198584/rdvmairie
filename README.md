# Automatisation de prise de rendez-vous en mairie avec un script créé par ChatGPT

Ce projet contient un script JavaScript qui automatise la prise de rendez-vous en mairie pour une carte d'identité. Le script a été généré par ChatGPT, une intelligence artificielle développée par OpenAI. Il se charge de rafraîchir la page et de remplir les formulaires à votre place, en vous alertant lorsqu'un créneau est disponible dans les deux semaines.

## Prérequis

Pour utiliser ce script, vous devez avoir installé :

- Node.js (version 14.0 ou supérieure)

## Installation

1. Clonez ce dépôt Git sur votre machine locale en utilisant la commande suivante :

```
git clone https://github.com/votre-nom-d-utilisateur/rdv-mairie-script.git
```

2. Accédez au dossier cloné et installez les dépendances du projet en exécutant :

```
cd rdv-mairie-script
npm install
```

## Configuration

Pour adapter le script à vos besoins, modifiez les variables suivantes dans le fichier `rdvMairie.js` :

- `url`: Remplacez cette valeur par l'URL de la page de prise de rendez-vous de votre mairie.
- Les sélecteurs de formulaire : Remplacez les sélecteurs de formulaire par les sélecteurs correspondant aux champs de formulaire de votre mairie. Par exemple, dans le code suivant :

```javascript
await page.waitForSelector('input[name="f29"]');
await page.click('input[name="f29"][value=""]');
await page.type('input[name="f30"]', '');
await page.type('input[name="f31"]', '');
await page.type('input[name="f158"]', '');
await page.type('input[name="f38"]', '');
await page.click('input[name="f135"][value="cni"]');
await page.click('input[name="f136"][value="1pers"]');
```

Vous devrez remplacer les noms et valeurs des attributs name et value des sélecteurs de formulaire pour qu'ils correspondent aux champs de formulaire de la page de prise de rendez-vous de votre mairie. Assurez-vous également de saisir les informations appropriées entre les guillemets vides pour chaque champ de formulaire (ex : await page.type('input[name="f30"]', 'Votre nom')).

## Lancement du script

Pour lancer le script, exécutez la commande suivante dans le terminal :


```
node rdvMairie.js
```

## Testé sur le site de la Mairie de Tours

Ce script a été testé avec succès sur le site de la Mairie de Tours pour prendre un rendez-vous pour un passeport ou une carte nationale d'identité. L'URL utilisée pour le test est la suivante :

[https://formulaires.services.tours.fr/etat-civil-pieces-d-identite/rendez-vous-pour-un-passeport-ou-une-carte-nationale-d-identite/](https://formulaires.services.tours.fr/etat-civil-pieces-d-identite/rendez-vous-pour-un-passeport-ou-une-carte-nationale-d-identite/)

Veuillez noter que les sélecteurs de formulaire et l'URL sont spécifiques au site de la Mairie de Tours. Pour utiliser ce script sur un autre site de prise de rendez-vous, vous devrez adapter les sélecteurs de formulaire et l'URL en conséquence.

## Démonstration vidéo

Une démonstration vidéo de l'utilisation de ce script est disponible à l'adresse suivante : [https://youtu.be/H5JN-4gS2Sw](https://youtu.be/H5JN-4gS2Sw). N'hésitez pas à consulter la vidéo pour mieux comprendre comment fonctionne le script et comment l'utiliser.

## Autres usages

Bien que ce script ait été développé pour automatiser la prise de rendez-vous pour une carte d'identité, vous pouvez vous en inspirer pour créer des scripts similaires pour d'autres types de rendez-vous ou d'autres sites web. Adaptez simplement les sélecteurs de formulaire et l'URL en fonction du site et du formulaire que vous souhaitez automatiser.
