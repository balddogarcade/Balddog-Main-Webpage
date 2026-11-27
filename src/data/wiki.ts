export type WikiCategoryId = "user-guides";

export interface WikiCategory {
  id: WikiCategoryId;
  label: string;
  description: string;
}

export interface WikiSection {
  heading: string;
  paragraphs?: string[];
  steps?: string[];
  note?: string;
}

export interface WikiArticle {
  id: string;
  slug: string;
  category: WikiCategoryId;
  title: string;
  summary: string;
  readTime: string;
  updatedAt: string;
  sections: WikiSection[];
}

export const WIKI_CATEGORIES: WikiCategory[] = [
  {
    id: "user-guides",
    label: "Guías de Usuario",
    description:
      "Primeros pasos, salas multijugador, configuración de controles y replays en bald.dog ARCADE.",
  },
];

export const WIKI_ARTICLES: WikiArticle[] = [
  {
    id: "getting-started",
    slug: "primeros-pasos",
    category: "user-guides",
    title: "Primeros Pasos e Instalación",
    summary:
      "Cómo descargar e instalar bald.dog ARCADE en tu dispositivo Android y dejarlo listo para jugar.",
    readTime: "3 min",
    updatedAt: "2026-11-27",
    sections: [
      {
        heading: "Requisitos del sistema",
        paragraphs: [
          "bald.dog ARCADE está optimizado para dispositivos Android con soporte para emulación arcade y conexión P2P de baja latencia.",
        ],
        steps: [
          "Android 8.0 (Oreo) o superior.",
          "Al menos 150 MB de espacio libre para la aplicación y caché de juegos.",
          "Conexión Wi-Fi o datos móviles estables para salas multijugador en vivo.",
        ],
      },
      {
        heading: "Instalación del APK",
        steps: [
          "Descarga el archivo APK más reciente desde la sección Instalar App en la página de inicio.",
          "Abre el archivo descargado desde tu gestor de archivos o barra de notificaciones.",
          "Si Android solicita permiso para instalar aplicaciones de orígenes desconocidos, habilítalo para tu navegador.",
          "Completa la instalación y abre bald.dog ARCADE.",
        ],
        note: "Puedes verificar la versión instalada en cualquier momento desde el menú Ajustes dentro de la app.",
      },
    ],
  },
  {
    id: "live-rooms",
    slug: "salas-en-vivo",
    category: "user-guides",
    title: "Unirse y Crear Salas en Vivo",
    summary:
      "Aprende a explorar salas abiertas en la web, escanear códigos QR y jugar partidas multijugador en tiempo real.",
    readTime: "4 min",
    updatedAt: "2026-11-27",
    sections: [
      {
        heading: "Unirse desde la web con código QR",
        paragraphs: [
          "La sección Salas en Vivo muestra las partidas abiertas en tiempo real con su juego, estado y jugadores conectados.",
        ],
        steps: [
          "Entra a Salas en Vivo desde la barra de navegación superior.",
          "Elige una sala abierta y haz clic para ver su código QR de acceso directo.",
          "Abre bald.dog ARCADE en tu teléfono y usa el escáner QR para entrar al instante.",
        ],
      },
      {
        heading: "Crear tu propia sala",
        steps: [
          "Selecciona cualquier título compatible desde tu biblioteca en la app.",
          "Elige la opción Crear Sala y define si será pública (visible en Salas en Vivo) o privada.",
          "Comparte el enlace o código QR con tus amigos para que se unan como Jugador 2.",
        ],
        note: "Para mejor latencia, se recomienda que ambos jugadores estén conectados por Wi-Fi estable.",
      },
    ],
  },
  {
    id: "controls-gamepad",
    slug: "controles-y-mandos",
    category: "user-guides",
    title: "Controles y Mandos (Gamepad / Touch)",
    summary:
      "Configura controles táctiles en pantalla o conecta un mando Bluetooth/USB para una experiencia arcade completa.",
    readTime: "3 min",
    updatedAt: "2026-11-27",
    sections: [
      {
        heading: "Uso de mando Bluetooth o USB",
        paragraphs: [
          "bald.dog ARCADE detecta automáticamente la mayoría de los mandos estándar (Xbox, PlayStation, 8BitDo y genéricos).",
        ],
        steps: [
          "Empareja tu mando en los ajustes de Bluetooth de Android o conéctalo por cable USB-C.",
          "Abre la app y entra a Ajustes > Controles.",
          "Verifica que el mando aparezca activo y prueba los botones de dirección y acción.",
        ],
      },
      {
        heading: "Personalización de controles táctiles",
        steps: [
          "Durante una partida, abre el menú rápido y selecciona Editar Overlay.",
          "Arrastra los botones o ajusta su tamaño y opacidad según la pantalla de tu dispositivo.",
          "Guarda el perfil para aplicarlo automáticamente en futuras sesiones.",
        ],
      },
    ],
  },
  {
    id: "replays-rankings",
    slug: "replays-y-rankings",
    category: "user-guides",
    title: "Replays y Rankings",
    summary:
      "Descubre cómo se guardan tus mejores partidas, cómo ver replays en la web y cómo funcionan los rankings.",
    readTime: "2 min",
    updatedAt: "2026-11-27",
    sections: [
      {
        heading: "Reproducir replays en la web",
        paragraphs: [
          "Las partidas destacadas se publican en la sección de Replays para que puedas revivirlas directamente desde el navegador.",
        ],
        steps: [
          "Accede a la sección Replays o selecciona una partida reciente desde el inicio.",
          "Usa los controles del reproductor para pausar, adelantar o revisar momentos clave.",
        ],
      },
      {
        heading: "Rankings por juego",
        paragraphs: [
          "Cada título en el Catálogo registra actividad y puntuaciones de la comunidad. Mantén tu sesión iniciada en la app para que tus marcas cuenten en la tabla.",
        ],
      },
    ],
  },
];
