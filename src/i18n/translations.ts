export const languages = ["de", "el", "en"] as const;
export type Language = (typeof languages)[number];

export const languageLabels: Record<Language, string> = {
  de: "Deutsch",
  el: "Ελληνικά",
  en: "English",
};

const de = {
  nav: {
    home: "Start",
    gallery: "Galerie",
    contact: "Kontakt",
    cta: "Jetzt anfragen",
    menu: "Menü",
    close: "Schließen",
    language: "Sprache",
  },
  hero: {
    eyebrow: "Griechische Live Band",
    title: "Live-Musik, die Ihren Abend unvergesslich macht",
    subtitle:
      "Professionelle griechische Live Band für Hochzeiten, Firmenfeiern und große Festabende — elegant, energiegeladen und in höchster Klangqualität.",
    cta: "Termin anfragen",
    secondary: "Galerie ansehen",
    scroll: "Scrollen",
    soundOn: "Ton an",
    soundOff: "Ton aus",
  },
  stats: {
    years: "Jahre Bühnenerfahrung",
    events: "Gespielte Veranstaltungen",
    musicians: "Professionelle Musiker",
    repertoire: "Songs im Repertoire",
  },
  about: {
    eyebrow: "Über uns",
    title: "Griechische Musiktradition in moderner Perfektion",
    p1: "Wir sind eine professionelle griechische Live Band aus Deutschland. Seit vielen Jahren begleiten wir Hochzeiten, Taufen, Firmenfeiern und große Festabende mit authentischer griechischer Musik — von traditionellen Klängen aus Epirus, Kreta und Pontos bis zu modernen Laiko- und Entechno-Hits.",
    p2: "Jeder unserer Musiker ist ausgebildeter Profi. Wir spielen live, ohne Playback, und passen unser Programm exakt an Ihre Feier und Ihre Gäste an. Auf Wunsch auch mehrsprachig: griechisch, deutsch, englisch und international.",
    p3: "Moderne Technik, professionelle Beschallung und Bühnenlicht gehören selbstverständlich dazu. So entsteht ein Abend, der sich wie ein echtes Konzert anfühlt.",
    bullet1: "Hochzeiten & Taufen",
    bullet2: "Firmen- & Galaveranstaltungen",
    bullet3: "Festivals & Vereinsfeste",
    bullet4: "Deutschlandweit & europaweit",
    cta: {
      title: "Bereit für Ihren unvergesslichen Abend?",
      subtitle: "Lassen Sie uns gemeinsam Ihre Feier planen.",
      button: "Jetzt anfragen",
    },
    features: {
      f1: {
        title: "Live ohne Playback",
        description:
          "Jeder Ton kommt live von der Bühne — echte Instrumente, echte Stimmen, echte Energie.",
      },
      f2: {
        title: "Profi-Musiker",
        description:
          "Ausgebildete Musiker mit jahrzehntelanger Bühnenerfahrung in ganz Europa.",
      },
      f3: {
        title: "Programm nach Maß",
        description:
          "Wir stimmen Repertoire und Ablauf exakt auf Ihre Feier und Ihre Gäste ab.",
      },
      f4: {
        title: "Große Bandbreite",
        description:
          "Von Epirus, Kreta und Pontos bis zu modernen Laiko- und Entechno-Hits.",
      },
      f5: {
        title: "Technik inklusive",
        description:
          "Professionelle Beschallung und Bühnenlicht gehören selbstverständlich dazu.",
      },
      f6: {
        title: "Mehrsprachig",
        description: "Griechisch, deutsch, englisch und internationale Klassiker auf Wunsch.",
      },
    },
  },
  members: {
    eyebrow: "Die Band",
    title: "Musiker mit Herz und Handwerk",
    subtitle: "Ein eingespieltes Ensemble, das jeden Saal zum Leben erweckt.",
    m1: {
      name: "Dimitris",
      role: "Bouzouki",
      bio: "Gründer der Band und Meister der Bouzouki. Verbindet traditionelle Spieltechnik mit modernem Sound.",
    },
    m2: {
      name: "Yannis",
      role: "Klarinette",
      bio: "Klarinettist mit Wurzeln in Epirus. Bekannt für seine gefühlvollen Soli und die typischen Tanzrhythmen.",
    },
    m3: {
      name: "Eleni",
      role: "Gesang",
      bio: "Ausdrucksstarke Stimme für Laiko, Entechno und internationale Klassiker — griechisch, deutsch und englisch.",
    },
    m4: {
      name: "Nikos",
      role: "Keyboard",
      bio: "Arrangeur und Keyboarder. Sorgt für den vollen, warmen Bandsound und die Übergänge zwischen den Sets.",
    },
  },
  instruments: {
    eyebrow: "Instrumente",
    title: "Der Klang unserer Band",
    subtitle: "Traditionelle griechische Instrumente, kombiniert mit moderner Bühnentechnik.",
    bouzouki: {
      name: "Mpouzouki",
      desc: "Das Herz der griechischen Musik — hell, perkussiv und sofort erkennbar.",
    },
    clarinet: {
      name: "Klarinette",
      desc: "Die Seele der Volksmusik aus Epirus und Makedonien.",
    },
    lyra: {
      name: "Lira / Kemence",
      desc: "Pontische und kretische Lyra für authentische Tänze.",
    },
    ntaouli: {
      name: "Ntaouli",
      desc: "Die große Trommel, die jeden Festsaal in Bewegung bringt.",
    },
    keyboard: {
      name: "Keyboard",
      desc: "Volle Arrangements, Streicher und moderne Sounds.",
    },
    microphone: {
      name: "Gesang",
      desc: "Mehrsprachiger Live-Gesang mit professioneller Beschallung.",
    },
    violin: {
      name: "Geige",
      desc: "Elegante Melodielinien für ruhige und festliche Momente.",
    },
  },
  gallery: {
    eyebrow: "Galerie",
    title: "Momente von unseren Bühnen",
    subtitle: "Eindrücke von Hochzeiten, Galas und Festabenden.",
    viewAll: "Ganze Galerie ansehen",
    lightboxClose: "Bild schließen",
    prev: "Vorheriges Bild",
    next: "Nächstes Bild",
    photos: {
      p1: "Live-Auftritt auf der Hochzeitsbühne",
      p2: "Bouzouki im Detail",
      p3: "Klarinetten-Solo im Spotlight",
      p4: "Festsaal mit Live Band",
      p5: "Gesang auf der Bühne",
      p6: "Ntaouli und Percussion",
      p7: "Geige bei einer Gala",
      p8: "Tanzende Gäste",
      p9: "Lyra im Studio",
      p10: "Bouzouki live auf der Bühne",
      p11: "Sänger im Scheinwerferlicht",
      p12: "Klarinette und Ntaouli — Porträt",
      p13: "Die komplette Band",
      p14: "Keyboards live",
      p15: "Gesang bei einem Festabend",
    },
  },
  cta: {
    eyebrow: "Anfrage",
    title: "Machen Sie Ihren Abend zum Konzert",
    text: "Erzählen Sie uns von Ihrer Veranstaltung — wir melden uns kurzfristig mit einem persönlichen Angebot.",
    whatsapp: "Über WhatsApp schreiben",
    call: "Jetzt anrufen",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Wir freuen uns auf Ihre Anfrage",
    subtitle:
      "Direkt, persönlich und unkompliziert. Am schnellsten erreichen Sie uns über WhatsApp.",
    phone: "Telefon",
    email: "E-Mail",
    whatsapp: "WhatsApp",
    location: "Standort",
    hours: "Erreichbarkeit",
    hoursValue: "Täglich 09:00 – 21:00 Uhr",
    mapTitle: "Standort auf Google Maps",
    openMaps: "In Google Maps öffnen",
  },
  footer: {
    tagline: "Professionelle griechische Live Band für Hochzeiten, Galas und Firmenfeiern.",
    quickLinks: "Navigation",
    contact: "Kontakt",
    language: "Sprache",
    rights: "Alle Rechte vorbehalten.",
    imprint: "Impressum",
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Häufige Fragen',
    subtitle: 'Alles Wichtige zu Buchung, Ablauf und Technik auf einen Blick.',
    q1: 'Wie läuft eine Buchung ab?',
    a1: 'Sie senden uns Datum, Ort und Anlass per WhatsApp, Telefon oder Formular. Innerhalb von 24 Stunden erhalten Sie ein individuelles Angebot. Nach Ihrer Zusage reservieren wir den Termin verbindlich und stimmen alle Details in Ruhe mit Ihnen ab.',
    q2: 'Wie viele Musiker treten auf?',
    a2: 'Wir spielen je nach Anlass und Saalgröße in Besetzungen von 3 bis 8 Musikern — von Trio für kleinere Feiern bis zur kompletten Band mit Bouzouki, Klarinette, Violine, Keyboard, Percussion und Gesang.',
    q3: 'Welche Musik spielen Sie?',
    a3: 'Unser Repertoire umfasst über 500 Songs: traditionelle Musik aus Epirus, Kreta und Pontos, Rembetiko, Laiko, Entechno sowie moderne griechische Hits. Auf Wunsch ergänzen wir deutsche, englische und internationale Titel.',
    q4: 'Wie lange spielen Sie an einem Abend?',
    a4: 'Üblich sind vier bis fünf Stunden Live-Musik inklusive Pausen. Längere Auftritte sind jederzeit möglich und werden vorab im Angebot festgehalten.',
    q5: 'Bringen Sie Technik und Licht mit?',
    a5: 'Ja. Wir bringen professionelle Beschallung, Mischpult, Mikrofone und Bühnenlicht mit und übernehmen Aufbau, Soundcheck und Abbau komplett selbst.',
    q6: 'In welchen Regionen treten Sie auf?',
    a6: 'Wir spielen deutschlandweit und auch europaweit. Anfahrt und gegebenenfalls Übernachtung werden transparent im Angebot ausgewiesen.',
    q7: 'Wie viel kostet eine griechische Live Band?',
    a7: 'Der Preis richtet sich nach Besetzung, Spieldauer, Termin und Anfahrt. Sie erhalten immer ein festes Komplettangebot ohne versteckte Kosten.',
    q8: 'Können wir Wunschlieder mitgeben?',
    a8: 'Sehr gerne. Senden Sie uns Ihre Wunschliste — Hochzeitstanz, Familienlieder oder besondere Momente bereiten wir individuell vor.',
  },
  seo: {
    homeTitle: "Griechische Live Band | Hochzeiten, Galas & Firmenfeiern",
    homeDesc:
      "Professionelle griechische Live Band für Hochzeiten, Firmenfeiern und Galas. Authentische Musik, erstklassige Musiker, deutschlandweit buchbar.",
    galleryTitle: "Galerie | Griechische Live Band",
    galleryDesc:
      "Fotos unserer Auftritte: Hochzeiten, Galas, Festivals und Firmenfeiern mit griechischer Live-Musik.",
    contactTitle: "Kontakt | Griechische Live Band buchen",
    contactDesc:
      "Kontaktieren Sie unsere griechische Live Band per WhatsApp, Telefon oder E-Mail und sichern Sie sich Ihren Wunschtermin.",
  },
};

type Dict = typeof de;

const el: Dict = {
  nav: {
    home: "Αρχική",
    gallery: "Γκαλερί",
    contact: "Επικοινωνία",
    cta: "Κάντε κράτηση",
    menu: "Μενού",
    close: "Κλείσιμο",
    language: "Γλώσσα",
  },
  hero: {
    eyebrow: "Ελληνική Ζωντανή Ορχήστρα",
    title: "Ζωντανή μουσική που κάνει τη βραδιά σας αξέχαστη",
    subtitle:
      "Επαγγελματική ελληνική ορχήστρα για γάμους, εταιρικές εκδηλώσεις και μεγάλες γιορτές — κομψή, γεμάτη ενέργεια και άψογο ήχο.",
    cta: "Ζητήστε ημερομηνία",
    secondary: "Δείτε τη γκαλερί",
    scroll: "Κύλιση",
    soundOn: "Ήχος on",
    soundOff: "Ήχος off",
  },
  stats: {
    years: "Χρόνια εμπειρίας",
    events: "Εκδηλώσεις",
    musicians: "Επαγγελματίες μουσικοί",
    repertoire: "Τραγούδια ρεπερτορίου",
  },
  about: {
    eyebrow: "Σχετικά με εμάς",
    title: "Ελληνική μουσική παράδοση σε σύγχρονη τελειότητα",
    p1: "Είμαστε μια επαγγελματική ελληνική ζωντανή ορχήστρα με έδρα τη Γερμανία. Εδώ και πολλά χρόνια πλαισιώνουμε γάμους, βαφτίσεις, εταιρικές εκδηλώσεις και μεγάλες γιορτές με αυθεντική ελληνική μουσική — από Ήπειρο, Κρήτη και Πόντο έως σύγχρονα λαϊκά και έντεχνα.",
    p2: "Κάθε μουσικός μας είναι επαγγελματίας. Παίζουμε ζωντανά, χωρίς playback, και προσαρμόζουμε το πρόγραμμα στη δική σας εκδήλωση και στους καλεσμένους σας. Κατόπιν επιθυμίας και πολύγλωσσα: ελληνικά, γερμανικά, αγγλικά και διεθνή.",
    p3: "Σύγχρονος εξοπλισμός, επαγγελματικό ηχητικό και φωτισμός περιλαμβάνονται. Έτσι η βραδιά σας μοιάζει με πραγματική συναυλία.",
    bullet1: "Γάμοι & βαφτίσεις",
    bullet2: "Εταιρικές εκδηλώσεις & gala",
    bullet3: "Φεστιβάλ & συλλογικές γιορτές",
    bullet4: "Σε όλη τη Γερμανία & την Ευρώπη",
    cta: {
      title: "Έτοιμοι για μια αξέχαστη βραδιά;",
      subtitle: "Ας σχεδιάσουμε μαζί τη γιορτή σας.",
      button: "Κάντε κράτηση",
    },
    features: {
      f1: {
        title: "Ζωντανά, χωρίς playback",
        description:
          "Κάθε νότα παίζεται ζωντανά — αληθινά όργανα, αληθινές φωνές, αληθινή ενέργεια.",
      },
      f2: {
        title: "Επαγγελματίες μουσικοί",
        description: "Καταρτισμένοι μουσικοί με δεκαετίες εμπειρίας σε σκηνές της Ευρώπης.",
      },
      f3: {
        title: "Πρόγραμμα στα μέτρα σας",
        description: "Προσαρμόζουμε ρεπερτόριο και ροή στη δική σας εκδήλωση και στους καλεσμένους.",
      },
      f4: {
        title: "Μεγάλο εύρος",
        description: "Από Ήπειρο, Κρήτη και Πόντο έως σύγχρονα λαϊκά και έντεχνα.",
      },
      f5: {
        title: "Εξοπλισμός",
        description: "Επαγγελματικό ηχητικό και φωτισμός περιλαμβάνονται.",
      },
      f6: {
        title: "Πολύγλωσσα",
        description: "Ελληνικά, γερμανικά, αγγλικά και διεθνή κλασικά κατόπιν επιθυμίας.",
      },
    },
  },
  members: {
    eyebrow: "Η ορχήστρα",
    title: "Μουσικοί με μεράκι και τεχνική",
    subtitle: "Ένα δεμένο σχήμα που ζωντανεύει κάθε αίθουσα.",
    m1: {
      name: "Δημήτρης",
      role: "Μπουζούκι",
      bio: "Ιδρυτής της μπάντας και δεξιοτέχνης του μπουζουκιού. Ενώνει την παράδοση με σύγχρονο ήχο.",
    },
    m2: {
      name: "Γιάννης",
      role: "Κλαρίνο",
      bio: "Κλαρινίστας με ρίζες στην Ήπειρο. Ξεχωρίζει για τα συναισθηματικά σόλο και τους χορευτικούς ρυθμούς.",
    },
    m3: {
      name: "Ελένη",
      role: "Φωνή",
      bio: "Εκφραστική φωνή για λαϊκά, έντεχνα και διεθνή κλασικά — ελληνικά, γερμανικά και αγγλικά.",
    },
    m4: {
      name: "Νίκος",
      role: "Πλήκτρα",
      bio: "Ενορχηστρωτής και πληκτράς. Δίνει το γεμάτο, ζεστό ηχόχρωμα και τις μεταβάσεις των sets.",
    },
  },
  instruments: {
    eyebrow: "Όργανα",
    title: "Ο ήχος της ορχήστρας μας",
    subtitle: "Παραδοσιακά ελληνικά όργανα σε συνδυασμό με σύγχρονο εξοπλισμό σκηνής.",
    bouzouki: {
      name: "Μπουζούκι",
      desc: "Η καρδιά της ελληνικής μουσικής — λαμπερό και αμέσως αναγνωρίσιμο.",
    },
    clarinet: {
      name: "Κλαρίνο",
      desc: "Η ψυχή της δημοτικής μουσικής της Ηπείρου και της Μακεδονίας.",
    },
    lyra: {
      name: "Λύρα / Κεμεντζές",
      desc: "Ποντιακή και κρητική λύρα για αυθεντικούς χορούς.",
    },
    ntaouli: {
      name: "Νταούλι",
      desc: "Το μεγάλο τύμπανο που σηκώνει όλη την αίθουσα.",
    },
    keyboard: {
      name: "Πλήκτρα",
      desc: "Πλήρεις ενορχηστρώσεις, έγχορδα και σύγχρονοι ήχοι.",
    },
    microphone: {
      name: "Φωνή",
      desc: "Πολύγλωσσο ζωντανό τραγούδι με επαγγελματικό ηχητικό.",
    },
    violin: {
      name: "Βιολί",
      desc: "Κομψές μελωδικές γραμμές για ήρεμες και γιορτινές στιγμές.",
    },
  },
  gallery: {
    eyebrow: "Γκαλερί",
    title: "Στιγμές από τις σκηνές μας",
    subtitle: "Εικόνες από γάμους, gala και γιορτινές βραδιές.",
    viewAll: "Δείτε όλη τη γκαλερί",
    lightboxClose: "Κλείσιμο εικόνας",
    prev: "Προηγούμενη εικόνα",
    next: "Επόμενη εικόνα",
    photos: {
      p1: "Ζωντανή εμφάνιση σε γάμο",
      p2: "Λεπτομέρεια μπουζουκιού",
      p3: "Σόλο κλαρίνου στο φως",
      p4: "Αίθουσα δεξιώσεων με ζωντανή μπάντα",
      p5: "Τραγούδι στη σκηνή",
      p6: "Νταούλι και κρουστά",
      p7: "Βιολί σε gala",
      p8: "Καλεσμένοι που χορεύουν",
      p9: "Λύρα στο στούντιο",
      p10: "Μπουζούκι ζωντανά στη σκηνή",
      p11: "Ο τραγουδιστής στο φως",
      p12: "Κλαρίνο και νταούλι — πορτρέτο",
      p13: "Ολόκληρη η μπάντα",
      p14: "Πλήκτρα ζωντανά",
      p15: "Τραγούδι σε γιορτινή βραδιά",
    },
  },
  cta: {
    eyebrow: "Κράτηση",
    title: "Κάντε τη βραδιά σας συναυλία",
    text: "Πείτε μας για την εκδήλωσή σας — απαντάμε άμεσα με προσωπική προσφορά.",
    whatsapp: "Γράψτε μας στο WhatsApp",
    call: "Καλέστε μας",
  },
  contact: {
    eyebrow: "Επικοινωνία",
    title: "Περιμένουμε το μήνυμά σας",
    subtitle: "Άμεσα και προσωπικά. Ο πιο γρήγορος τρόπος είναι το WhatsApp.",
    phone: "Τηλέφωνο",
    email: "E-Mail",
    whatsapp: "WhatsApp",
    location: "Τοποθεσία",
    hours: "Ώρες επικοινωνίας",
    hoursValue: "Καθημερινά 09:00 – 21:00",
    mapTitle: "Τοποθεσία στους χάρτες Google",
    openMaps: "Άνοιγμα στους χάρτες Google",
  },
  footer: {
    tagline: "Επαγγελματική ελληνική ζωντανή ορχήστρα για γάμους, gala και εταιρικές εκδηλώσεις.",
    quickLinks: "Πλοήγηση",
    contact: "Επικοινωνία",
    language: "Γλώσσα",
    rights: "Με επιφύλαξη παντός δικαιώματος.",
    imprint: "Νομικές πληροφορίες",
  },
  faq: {
    eyebrow: 'Συχνές ερωτήσεις',
    title: 'Συχνές ερωτήσεις',
    subtitle: 'Όλα όσα χρειάζεται να ξέρετε για κρατήσεις, ρεπερτόριο και εξοπλισμό.',
    q1: 'Πώς γίνεται η κράτηση;',
    a1: 'Μας στέλνετε ημερομηνία, τόπο και είδος εκδήλωσης μέσω WhatsApp, τηλεφώνου ή φόρμας. Μέσα σε 24 ώρες λαμβάνετε εξατομικευμένη προσφορά και μετά την έγκρισή σας κρατάμε την ημερομηνία.',
    q2: 'Πόσοι μουσικοί εμφανίζονται;',
    a2: 'Ανάλογα με την εκδήλωση παίζουμε από 3 έως 8 μουσικούς — από τρίο έως πλήρες σχήμα με μπουζούκι, κλαρίνο, βιολί, πλήκτρα, κρουστά και φωνή.',
    q3: 'Τι μουσική παίζετε;',
    a3: 'Πάνω από 500 τραγούδια: παραδοσιακά Ηπείρου, Κρήτης και Πόντου, ρεμπέτικα, λαϊκά, έντεχνα και σύγχρονες επιτυχίες. Προαιρετικά και γερμανικά, αγγλικά ή διεθνή κομμάτια.',
    q4: 'Πόση ώρα παίζετε;',
    a4: 'Συνήθως τέσσερις έως πέντε ώρες ζωντανής μουσικής με διαλείμματα. Μεγαλύτερη διάρκεια είναι πάντα εφικτή κατόπιν συνεννόησης.',
    q5: 'Φέρνετε ηχητικά και φωτισμό;',
    a5: 'Ναι. Διαθέτουμε επαγγελματικό ηχητικό σύστημα, κονσόλα, μικρόφωνα και φωτισμό σκηνής, και αναλαμβάνουμε πλήρως στήσιμο και αποξήλωση.',
    q6: 'Σε ποιες περιοχές εμφανίζεστε;',
    a6: 'Σε όλη τη Γερμανία και σε ολόκληρη την Ευρώπη. Τα έξοδα μετακίνησης και διαμονής αναγράφονται καθαρά στην προσφορά.',
    q7: 'Πόσο κοστίζει μια ελληνική ορχήστρα;',
    a7: 'Η τιμή εξαρτάται από το σχήμα, τη διάρκεια, την ημερομηνία και την απόσταση. Λαμβάνετε πάντα σταθερή συνολική προσφορά χωρίς κρυφές χρεώσεις.',
    q8: 'Μπορούμε να ζητήσουμε συγκεκριμένα τραγούδια;',
    a8: 'Φυσικά. Στείλτε μας τη λίστα σας — πρώτος χορός, οικογενειακά τραγούδια ή ξεχωριστές στιγμές προετοιμάζονται ειδικά για εσάς.',
  },
  seo: {
    homeTitle: "Ελληνική Ζωντανή Ορχήστρα | Γάμοι, Gala & Εκδηλώσεις",
    homeDesc:
      "Επαγγελματική ελληνική ορχήστρα για γάμους, εταιρικές εκδηλώσεις και gala. Αυθεντική μουσική και κορυφαίοι μουσικοί.",
    galleryTitle: "Γκαλερί | Ελληνική Ζωντανή Ορχήστρα",
    galleryDesc: "Φωτογραφίες από γάμους, gala, φεστιβάλ και εταιρικές εκδηλώσεις.",
    contactTitle: "Επικοινωνία | Κλείστε την ελληνική ορχήστρα",
    contactDesc: "Επικοινωνήστε μαζί μας μέσω WhatsApp, τηλεφώνου ή email και κλείστε ημερομηνία.",
  },
};

const en: Dict = {
  nav: {
    home: "Home",
    gallery: "Gallery",
    contact: "Contact",
    cta: "Book the band",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  hero: {
    eyebrow: "Greek Live Band",
    title: "Live music that turns your evening into a concert",
    subtitle:
      "A professional Greek live band for weddings, corporate events and grand celebrations — elegant, energetic and impeccably produced.",
    cta: "Request a date",
    secondary: "View gallery",
    scroll: "Scroll",
    soundOn: "Sound on",
    soundOff: "Sound off",
  },
  stats: {
    years: "Years on stage",
    events: "Events performed",
    musicians: "Professional musicians",
    repertoire: "Songs in repertoire",
  },
  about: {
    eyebrow: "About us",
    title: "Greek musical tradition, performed with modern precision",
    p1: "We are a professional Greek live band based in Germany. For many years we have accompanied weddings, christenings, corporate events and large celebrations with authentic Greek music — from the traditions of Epirus, Crete and Pontos to modern laiko and entechno hits.",
    p2: "Every one of our musicians is a trained professional. We play fully live, never to playback, and shape the programme precisely around your celebration and your guests. Multilingual on request: Greek, German, English and international.",
    p3: "Modern equipment, professional sound and stage lighting are always included — so the evening feels like a real concert.",
    bullet1: "Weddings & christenings",
    bullet2: "Corporate events & galas",
    bullet3: "Festivals & community celebrations",
    bullet4: "Available across Germany & Europe",
    cta: {
      title: "Ready for an unforgettable evening?",
      subtitle: "Let's plan your celebration together.",
      button: "Book the band",
    },
    features: {
      f1: {
        title: "Fully live, no playback",
        description:
          "Every note is played live — real instruments, real voices, real energy.",
      },
      f2: {
        title: "Professional musicians",
        description: "Trained musicians with decades of stage experience across Europe.",
      },
      f3: {
        title: "Tailored programme",
        description: "We shape repertoire and flow precisely around your event and your guests.",
      },
      f4: {
        title: "Wide repertoire",
        description: "From Epirus, Crete and Pontos to modern laiko and entechno hits.",
      },
      f5: {
        title: "Sound & light included",
        description: "Professional PA and stage lighting always come as part of the package.",
      },
      f6: {
        title: "Multilingual",
        description: "Greek, German, English and international classics on request.",
      },
    },
  },
  members: {
    eyebrow: "The band",
    title: "Musicians with heart and craft",
    subtitle: "A tight ensemble that brings any room to life.",
    m1: {
      name: "Dimitris",
      role: "Bouzouki",
      bio: "Founder of the band and master of the bouzouki, blending traditional technique with a modern sound.",
    },
    m2: {
      name: "Yannis",
      role: "Clarinet",
      bio: "Clarinettist with roots in Epirus, known for soulful solos and irresistible dance rhythms.",
    },
    m3: {
      name: "Eleni",
      role: "Vocals",
      bio: "An expressive voice for laiko, entechno and international classics — in Greek, German and English.",
    },
    m4: {
      name: "Nikos",
      role: "Keyboard",
      bio: "Arranger and keyboard player, delivering the warm, full band sound and seamless set transitions.",
    },
  },
  instruments: {
    eyebrow: "Instruments",
    title: "The sound of our band",
    subtitle: "Traditional Greek instruments combined with modern stage technology.",
    bouzouki: {
      name: "Bouzouki",
      desc: "The heart of Greek music — bright, percussive and instantly recognisable.",
    },
    clarinet: {
      name: "Clarinet",
      desc: "The soul of folk music from Epirus and Macedonia.",
    },
    lyra: {
      name: "Lyra / Kemence",
      desc: "Pontic and Cretan lyra for authentic traditional dances.",
    },
    ntaouli: {
      name: "Ntaouli",
      desc: "The great drum that gets every hall moving.",
    },
    keyboard: {
      name: "Keyboard",
      desc: "Full arrangements, strings and contemporary textures.",
    },
    microphone: {
      name: "Vocals",
      desc: "Multilingual live vocals with professional sound reinforcement.",
    },
    violin: {
      name: "Violin",
      desc: "Elegant melodic lines for both intimate and festive moments.",
    },
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Moments from our stages",
    subtitle: "Impressions from weddings, galas and festive nights.",
    viewAll: "View the full gallery",
    lightboxClose: "Close image",
    prev: "Previous image",
    next: "Next image",
    photos: {
      p1: "Live performance on the wedding stage",
      p2: "Bouzouki close-up",
      p3: "Clarinet solo in the spotlight",
      p4: "Ballroom with live band",
      p5: "Vocals on stage",
      p6: "Ntaouli and percussion",
      p7: "Violin at a gala",
      p8: "Guests dancing",
      p9: "Lyra in the studio",
      p10: "Bouzouki live on stage",
      p11: "The singer in the spotlight",
      p12: "Clarinet and ntaouli — portrait",
      p13: "The full band",
      p14: "Keyboards live",
      p15: "Vocals at a festive night",
    },
  },
  cta: {
    eyebrow: "Booking",
    title: "Turn your evening into a concert",
    text: "Tell us about your event — we reply quickly with a personal offer.",
    whatsapp: "Message us on WhatsApp",
    call: "Call us now",
  },
  contact: {
    eyebrow: "Contact",
    title: "We look forward to hearing from you",
    subtitle: "Direct, personal and easy. The fastest way to reach us is WhatsApp.",
    phone: "Phone",
    email: "Email",
    whatsapp: "WhatsApp",
    location: "Location",
    hours: "Availability",
    hoursValue: "Daily 09:00 – 21:00",
    mapTitle: "Location on Google Maps",
    openMaps: "Open in Google Maps",
  },
  footer: {
    tagline: "Professional Greek live band for weddings, galas and corporate events.",
    quickLinks: "Navigation",
    contact: "Contact",
    language: "Language",
    rights: "All rights reserved.",
    imprint: "Legal notice",
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    subtitle: 'Everything you need to know about booking, repertoire and equipment.',
    q1: 'How does booking work?',
    a1: 'Send us your date, venue and occasion via WhatsApp, phone or the contact form. You will receive a tailored quote within 24 hours, and once you confirm we reserve the date for you.',
    q2: 'How many musicians perform?',
    a2: 'Depending on the event we perform with 3 to 8 musicians — from a trio for smaller celebrations to the full band with bouzouki, clarinet, violin, keys, percussion and vocals.',
    q3: 'What kind of music do you play?',
    a3: 'Our repertoire covers more than 500 songs: traditional music from Epirus, Crete and Pontos, rembetiko, laiko, entechno and modern Greek hits, plus German, English and international songs on request.',
    q4: 'How long do you play?',
    a4: 'A typical evening includes four to five hours of live music with breaks. Longer sets are always possible and are agreed in advance.',
    q5: 'Do you bring sound and lighting?',
    a5: 'Yes. We bring professional PA, mixing desk, microphones and stage lighting, and we handle setup, soundcheck and teardown ourselves.',
    q6: 'Where do you perform?',
    a6: 'We perform throughout Germany and across Europe. Travel and accommodation costs are always listed transparently in the quote.',
    q7: 'What does a Greek live band cost?',
    a7: 'Pricing depends on line-up, playing time, date and travel distance. You always receive a fixed all-in quote with no hidden fees.',
    q8: 'Can we request specific songs?',
    a8: 'Absolutely. Send us your wish list — first dance, family favourites or special moments are prepared individually for your event.',
  },
  seo: {
    homeTitle: "Greek Live Band | Weddings, Galas & Corporate Events",
    homeDesc:
      "Professional Greek live band for weddings, corporate events and galas. Authentic music, first-class musicians, available across Germany.",
    galleryTitle: "Gallery | Greek Live Band",
    galleryDesc:
      "Photos of our performances: weddings, galas, festivals and corporate events with Greek live music.",
    contactTitle: "Contact | Book the Greek Live Band",
    contactDesc:
      "Contact our Greek live band via WhatsApp, phone or email and secure your preferred date.",
  },
};

export const resources: Record<Language, Dict> = { de, el, en };
export type Translation = Dict;
