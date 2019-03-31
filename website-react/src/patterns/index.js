const patternDictionary = [
    {
        pattern: '\\b(Bonjour|Salut|Hey)\\b',
        intent: 'Bonjour'
    },
    {
        pattern: '\\b(Au revoir|A bientôt)\\b',
        intent: 'Sortie'
    },
    {
        pattern: '\\b(comment) (ça|tu) (va|vas)\\b',
        intent: 'Etat'
    },
    {
        pattern: '\\b(trie les) (résultats|hotels) (par) (?<Critere>([a-z]\\w+))\\b',
        intent: 'Tri'
    },
    {
        pattern: '\\b(quels) (sont) (les) (destinations|hôtels|hotels) (qui) (coutent|coûtent|coute|coûte) (?<PlusMinus>([a-z]\\w+)) (de) (?<Prix>([0-9]\\w+))\\b',
        intent: 'PlusMoinsPrix'
    },
    {
        pattern: '\\b(efface|réinitialise|redémarre)\\b',
        intent: 'Réinitialisation'
    },
    {
        pattern: '\\b(quels) (sont) (les) (destinations|hotels|hôtels) (se) (trouvant) (dans) (la) (région|region) (?<Region>([a-z]\\w+))\\b',
        intent: 'DestinationRegion'
    },
    {
        pattern: '\\b(quelles) (sont) (les) (destinations|hotels|hôtels) (ou|où) (il) (fait) (<Temperature>([a-z]\\w+))\\b',
        intent: 'DestinationTemperature'
    },



    {
        pattern: '\\b(how|what) (is) (the) (weather) (in) (?<City>([A-Z]\\w+) ?([A-Z]\\w+?))\\b',
        intent: 'CurrentWeather'
    },
    {
        pattern: '\\b(what) (is) (the) (time) (in) (?<City>(\\w+) ?(\\w+?))\\b',
        intent: 'CurrentTime'
    },
    {
        pattern: '\\b(is) (it) (?<Weather>([a-z]\\w+)) (in) (?<City>(\\w+) ?(\\w+?))\\b',
        intent: 'CurrentWeatherStatus'
    },
    {
        pattern: '\\b(will) (it) (be) (?<Weather>\\w+) (in) (?<City>(\\w+) ?(\\w+?))\\b ((in) (?<ForecastTime>\\d) (days?))',
        intent: 'ForecastWeatherStatus'
    }
];

module.exports = patternDictionary;