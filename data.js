const data = [
    {
        _id: 'cXFgEyZ3LckStAYo8',
        title: 'Apnoe-Bradykardie-Syndrom',
        slug: 'apnoe-bradykardie-syndrom',
        speciality: 'paediatrics',
        type: 'flashcard',
        assignTo: '5cfbf24a7b1260d8a3446fc7',
        category: ['Neonatologie'],
        synonyms: ['ABS', 'Apnoe-Bradykardie-Hypoxämie-Symptomatik', 'ABHS'],
        isEdited: { user: '5cfbf24a7b1260d8a3446fc7', timestamp: 1592511465 }
    },
    {
        _id: 'HsNSZTshScZCcZchE',
        parent: 'cXFgEyZ3LckStAYo8',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'intro',
        content: {
            de: [
                {
                    content: 'Apnoen sind also meist Ausdruck einer physiologischen Unreife der Atmungskontrolle und -mechanik. Es bleibt aber weiterhin unklar welches Ausmaß in Frequenz und Ausprägung der Apnoen physiologisch sind und welche negative Auswirkungen auf die weitere Entwicklung haben.',
                    timestamp: 1594676471,
                    user: '5f0c0229a2afce6bec0f828e'
                }
            ]
        },
        reference: ['c8RFbiCEMiPods3xy']
    },
    {
        _id: '2TYbDKZZQRi4EYr7h',
        content: {
            de: [
                {
                    content: 'Unreifes Atemzentrum reagiert mit zentraler Apnoe auf Infektion, IVH, metabolische Störungen (Hypoglykämie, Elektrolytstörungen)',
                    extended: null,
                    timestamp: 1592222377,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 1,
        parent: 'mB5ePFLSti5miYvL3',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: '3GTXziJaimit5BKjo',
        content: {
            de: [
                {
                    content: '20 % der Kinder in der 34. SSW machen Apnoen',
                    extended: null,
                    timestamp: 1592483963,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 1,
        parent: 'CwTfAkMAwRbQ5v5MZ',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['3D7foyqiWdnyfPM2k']
    },
    {
        _id: '53ypCDZvzyekLgzkR',
        content: {
            de: [
                {
                    content: 'Diagnostik',
                    extended: null,
                    timestamp: 1592222449,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 4,
        parent: 'cXFgEyZ3LckStAYo8',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'group',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: '6RD6ZdFF8AmnPmvx8',
        content: {
            de: [
                {
                    content: 'Sono-Schädel bei V.a. IVH',
                    extended: null,
                    timestamp: 1592223497,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 4,
        parent: '53ypCDZvzyekLgzkR',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: '6SFRGTN9LPCvc37Hu',
        content: {
            de: [
                {
                    content: 'Therapie',
                    extended: null,
                    timestamp: 1589349383,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 5,
        parent: 'cXFgEyZ3LckStAYo8',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'group',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'CwTfAkMAwRbQ5v5MZ',
        content: {
            de: [
                {
                    content: 'Alle Kinder < 37. SSW dürfen prinzipiell eine periodische Atmung aufweisen bzw. Apnoen machen',
                    extended: null,
                    timestamp: 1592483966,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 2,
        parent: 'mB5ePFLSti5miYvL3',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'group',
        context: 'default',
        reference: ['3D7foyqiWdnyfPM2k']
    },
    {
        _id: 'EErKR8eA3hShKkwNF',
        content: {
            de: [
                {
                    content: 'Apnoe = Atemstillstand > 20 Sekunden; Obstruktive Apnoe = Atembewegung, kein Fluss; Zentrale Apnoe = Keine Atembewegung, kein Fluss',
                    extended: null,
                    timestamp: 1592483974,
                    user: '5cfbf24a7b1260d8a3446fc7',
                    reviewed: { user: '5f0c0229a2afce6bec0f828e', timestamp: 1594792542 }
                }
            ]
        },
        order: 1,
        parent: 'cXFgEyZ3LckStAYo8',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'info',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'EjmCQBDKxxCCmuaie',
        content: {
            de: [
                {
                    content: 'Labor: BB, BGA, BZ, CRP, IL-6, BK bei V.a. Infektion oder metabolische Störung',
                    extended: null,
                    timestamp: 1592223523,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 3,
        parent: '53ypCDZvzyekLgzkR',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'H85nQPTdGwneu7hYW',
        content: {
            de: [
                {
                    content: 'Anämie / Hypovolämie',
                    extended: null,
                    timestamp: 1589349295,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 4,
        parent: 'mceuRw9z6hWzABRdQ',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'HEvLLJNxr3ehYa3Hx',
        content: {
            de: [
                {
                    content: '"Third-line" Behandlung nach Coffein und CPAP',
                    extended: null,
                    timestamp: 1592221620,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 1,
        parent: 'ntHuXmEyEYAwmDeKv',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['oqzvEnQRCMTdZmWLA', 'd9rTu2wqbdzbfunGN']
    },
    {
        _id: 'J256f96Cw4ELDEe3P',
        content: {
            de: [
                {
                    content: 'Wenn Coffein nicht ausreicht (> 2 Apnoen/Stunde)',
                    extended: null,
                    timestamp: 1592483940,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 1,
        parent: 'TSzCWNHEeARW3RBwm',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'KphABtGjvsCY34HMJ',
        content: {
            de: [
                {
                    content: 'Dopram® p.o. doppelt so hoch dosieren wie i.v. und auf 12 ED verteilen (wegen HWZ)',
                    extended: null,
                    timestamp: 1592286892,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 4,
        parent: 'ntHuXmEyEYAwmDeKv',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'L7kd4sXJxdqx4dG2f',
        content: {
            de: [
                {
                    content: 'Bei Frühgeborenen großzügige Indikationsstellung (early CPAP)',
                    extended: null,
                    timestamp: 1592221072,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 3,
        parent: 'TSzCWNHEeARW3RBwm',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'Lz3tRRzcw7K67KB8N',
        content: {
            de: [
                {
                    content: 'Behandlungsbedürftig, wenn Kinder stimulationsbedürftig oder SaO2-Abfall unter 80%',
                    extended: null,
                    timestamp: 1592222192,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 3,
        parent: 'mB5ePFLSti5miYvL3',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'N3brXFdcQLafKjZkE',
        content: {
            de: [
                {
                    content: 'Trinkmengen und Medikamente überprüfen',
                    extended: null,
                    timestamp: 1589349338,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 1,
        parent: '53ypCDZvzyekLgzkR',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'Pb4r4QubcXxQCu26B',
        content: {
            de: [
                {
                    content: 'Binasaler flow 2-4 Liter/min',
                    extended: null,
                    timestamp: 1592223359,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 4,
        parent: 'TSzCWNHEeARW3RBwm',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'R927yF9aPDXXqFB3o',
        content: {
            de: [
                {
                    content: 'Medikamente',
                    extended: null,
                    timestamp: 1589349285,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 3,
        parent: 'mceuRw9z6hWzABRdQ',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'REuMMuvD53XXapmqx',
        content: {
            de: [
                {
                    content: 'Infektion / Sepsis',
                    extended: null,
                    timestamp: 1592223425,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 1,
        parent: 'mceuRw9z6hWzABRdQ',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'S4Hmt2oy2fGNuqaoj',
        content: {
            de: [
                {
                    content: 'Doxapram absetzen',
                    extended: null,
                    timestamp: 1592223027,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 1,
        parent: 'tGDEE8DYGkLuwWG3B',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'TSzCWNHEeARW3RBwm',
        content: {
            de: [
                {
                    content: 'CPAP',
                    extended: null,
                    timestamp: 1589440779,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 2,
        parent: '6SFRGTN9LPCvc37Hu',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'group',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'TwSr4HiPG54sNsc4x',
        content: {
            de: [
                {
                    content: 'Keine Spiegelkontrollen aufgrund der großen therapeutischen Breite notwendig',
                    extended: null,
                    timestamp: 1592485519,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 4,
        parent: 'cgLGwyWbNPgdkecxy',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['c8RFbiCEMiPods3xy']
    },
    {
        _id: 'Xb6qwD5fiR9eK7ivE',
        content: {
            de: [
                {
                    content: 'Dopram® 0,5 (- 2) mg/kg/h, bei Bedarf in 0,5 mg/kg/h-Schritten steigern (oder reduzieren)',
                    extended: 'Insgesamt besteht aktuell noch eine unsichere Datenlage bzgl. Der effektiven Dosierung (unterschieden wird häufig zwischen Hochdosisgabe [>1,5 mg/kg] und Niedrigdosis [0,2-1,5 mg/kg]) und Langzeitfolgen.',
                    timestamp: 1605263385,
                    user: '5f3f5578a2afce59460f828f',
                    reviewed: { timestamp: 1605263385, user: '5f3f5578a2afce59460f828f' }
                }
            ]
        },
        order: 2,
        parent: 'ntHuXmEyEYAwmDeKv',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['sgiMMCY4dzYgR2mvz', 'zwZxCRwoXoFjxxKgK', 'd9rTu2wqbdzbfunGN']
    },
    {
        _id: 'Yq6vve7KMdPbJYSHW',
        content: {
            de: [
                {
                    content: 'Zur häuslichen Therapie wird Coffeinbase (5 mg/kg entspricht 10 mg/kg Coffeinzitrat) verordnet',
                    extended: 'Rezept: Coffein-Lösung 1 % (10 mg/ml) 50 g nach NRF 3.1.\n' +
                        'Hinweis: Auch in Coffein(base)-Lösung ist eine geringe Menge Citronensäure zur Wasserlöslichkeit enthalten (0,06 g in 100 ml)',
                    timestamp: 1605263317,
                    user: '5f3f5578a2afce59460f828f',
                    reviewed: { timestamp: 1605263317, user: '5f3f5578a2afce59460f828f' }
                }
            ]
        },
        order: 5,
        parent: 'cgLGwyWbNPgdkecxy',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['BTWNnEGcoDQXZEopr']
    },
    {
        _id: 'bWNA9GccJ7WkCKgTi',
        content: {
            de: [
                {
                    content: 'Klinische Untersuchung: Durchgängigkeit der Atemwege? Auskultation der Lungen, seitengleiches Atemgeräusch? Giemen? Zeichen der Obstruktion?',
                    extended: null,
                    timestamp: 1589349351,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 2,
        parent: '53ypCDZvzyekLgzkR',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'cgLGwyWbNPgdkecxy',
        content: {
            de: [
                {
                    content: 'Coffeinzitrat',
                    extended: null,
                    timestamp: 1589440730,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 1,
        parent: '6SFRGTN9LPCvc37Hu',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'group',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'e3RaouiZoXuA4Xfeo',
        content: {
            de: [
                {
                    content: 'Peep 4-6 cm H2O',
                    extended: null,
                    timestamp: 1592223379,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 5,
        parent: 'TSzCWNHEeARW3RBwm',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw', '3D7foyqiWdnyfPM2k']
    },
    {
        _id: 'esRxDFSoZQtr3tRCp',
        content: {
            de: [
                {
                    content: 'Coffeinzitrat 20 mg/kg (loading dose), dann 10 mg/kg 1 ED (Peyona® zur i.v.-Therapie)',
                    extended: 'Dosis an Gewicht anpassen oder aktiv reduzieren (nicht "rauswachsen" lassen). Reduktion um 10 mg/kg. Absetzen, wenn mit 10 mg/kg 3 Tage weniger als 3 Apnoen.',
                    timestamp: 1592816768,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 2,
        parent: 'cgLGwyWbNPgdkecxy',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['vKJ3cnwBwS3Dsibwq', 'qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'haEKNqampEqEbwFdJ',
        content: {
            de: [
                {
                    content: '85 % der Kinder in der 30. SSW machen Apnoen',
                    extended: null,
                    timestamp: 1592483962,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 2,
        parent: 'CwTfAkMAwRbQ5v5MZ',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['3D7foyqiWdnyfPM2k']
    },
    {
        _id: 'icggfWTCtzu2s5CTm',
        content: {
            de: [
                {
                    content: 'IVH',
                    extended: null,
                    timestamp: 1589349303,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 6,
        parent: 'mceuRw9z6hWzABRdQ',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'igaHNL5LaPE4FKdPt',
        content: {
            de: [
                {
                    content: '100 % der Kinder < 28. SSW machen Apnoen',
                    extended: null,
                    timestamp: 1592483961,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 3,
        parent: 'CwTfAkMAwRbQ5v5MZ',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['3D7foyqiWdnyfPM2k']
    },
    {
        _id: 'inEcmCtLqMrfvXvLg',
        content: {
            de: [
                {
                    content: 'Persistierende oder zunehmende Dyspnoe (> 1 Stunde)',
                    extended: null,
                    timestamp: 1592483944,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 2,
        parent: 'TSzCWNHEeARW3RBwm',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'mB5ePFLSti5miYvL3',
        content: {
            de: [
                {
                    content: 'Apnoen sind ein Zeichen von Unreife',
                    extended: null,
                    timestamp: 1592222342,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 2,
        parent: 'cXFgEyZ3LckStAYo8',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'group',
        context: 'default',
        reference: ['c8RFbiCEMiPods3xy']
    },
    {
        _id: 'mMSrPyJuhscKwHxx7',
        content: {
            de: [
                {
                    content: 'Der frühe Beginn eine Coffein-Therapie verringert das Auftreten einer BPD und verbessert das neurologische Outcome Frühgeborener',
                    extended: null,
                    timestamp: 1592221896,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 1,
        parent: 'cgLGwyWbNPgdkecxy',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['8NNRdXgdWNcLvZewN', 'sKnBPeRodxFmE4LRz']
    },
    {
        _id: 'mceuRw9z6hWzABRdQ',
        content: {
            de: [
                {
                    content: 'Differentialdiagnosen',
                    extended: null,
                    timestamp: 1592222423,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 3,
        parent: 'cXFgEyZ3LckStAYo8',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'group',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'mopwKnwfJCLXp4kaq',
        content: {
            de: [
                {
                    content: 'Kann ggf. bis 20 (- 40) mg/kg gesteigert werden, dann in 2 ED',
                    extended: null,
                    timestamp: 1605263229,
                    user: '5f3f5578a2afce59460f828f',
                    reviewed: { timestamp: 1605263229, user: '5f3f5578a2afce59460f828f' }
                }
            ]
        },
        order: 3,
        parent: 'cgLGwyWbNPgdkecxy',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['c8RFbiCEMiPods3xy']
    },
    {
        _id: 'nKAJfMHBez36nSr7v',
        content: {
            de: [
                {
                    content: 'Um 0,5 mg/kg/h alle 6 h nach Besserung oder bei Nebenwirkungen reduzieren; Minimaldosis 0,5 mg/kg/h',
                    extended: null,
                    timestamp: 1592483959,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 3,
        parent: 'ntHuXmEyEYAwmDeKv',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'ntHuXmEyEYAwmDeKv',
        content: {
            de: [
                {
                    content: 'Doxapram',
                    extended: null,
                    timestamp: 1589440822,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 3,
        parent: '6SFRGTN9LPCvc37Hu',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'group',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'tGDEE8DYGkLuwWG3B',
        content: {
            de: [
                {
                    content: 'Invasive Beatmung',
                    extended: null,
                    timestamp: 1592221732,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 4,
        parent: '6SFRGTN9LPCvc37Hu',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'group',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'tNkuTKbXSFED6hKQS',
        content: {
            de: [
                {
                    content: 'NEC',
                    extended: null,
                    timestamp: 1592223431,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 5,
        parent: 'mceuRw9z6hWzABRdQ',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['qYqSr6Y4MSjCeYpBw']
    },
    {
        _id: 'uQkcaiLbdw5R5hHun',
        content: {
            de: [
                {
                    content: 'Metabolische Störungen',
                    extended: null,
                    timestamp: 1605263203,
                    user: '5f3f5578a2afce59460f828f',
                    reviewed: { timestamp: 1605263203, user: '5f3f5578a2afce59460f828f' }
                }
            ]
        },
        order: 2,
        parent: 'mceuRw9z6hWzABRdQ',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    },
    {
        _id: 'udm28fA64Y8dovQ6m',
        content: {
            de: [
                {
                    content: 'HF-Abfälle ohne SaO2-Abfälle nicht behandlungsbedürftig',
                    extended: null,
                    timestamp: 1589349180,
                    user: '5cfbf24a7b1260d8a3446fc7'
                }
            ]
        },
        order: 4,
        parent: 'mB5ePFLSti5miYvL3',
        main: 'cXFgEyZ3LckStAYo8',
        type: 'item',
        context: 'default',
        reference: ['noReferenceNeeded']
    }
]