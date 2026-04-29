const apps = [
  {
    title: "1FoodMenu",
    url: "https://1food.menu/",
    logo: "https://1food.menu/1food-menu-logo.svg",
    description: "Digital food menus for restaurants",
    follow: true,
  },
  {
    title: "Bunny CDN",
    url: "https://bunny-cdn.netlify.app/",
    logo: "https://bunny-cdn.netlify.app/bunnyLogo.svg",
    description: "Assets manager with a better UI",
  },
  {
    title: "Saver Wallet",
    url: "https://saver-wallet.netlify.app/",
    logo: "https://saver-wallet.netlify.app/saver-wallet-logo.svg",
    description: "Never forget your cards at home",
  },
  {
    title: "Rock Paper Scissors",
    url: "https://rps-game.online/",
    logo: "https://rps-game.online/rock-paper-scissors-logo.svg",
    description: "Play RPS game online",
  },
  {
    title: "Bookmark Manager",
    url: "https://bookmarks-manager.online/",
    logo: "https://bookmarks-manager.online/logo.svg",
    description: "Manage your bookmarks easily",
  },
]

export default function WebApps() {
  return (
    <section className="section container-sm">
      <h2 className="text-3xl font-bold text-center mb-10">Web Apps</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {apps.map((app) => (
          <a
            key={app.title}
            href={app.url}
            target="_blank"
            rel={app.follow ? undefined : "nofollow noopener"}
            title={app.title}
            className="flex items-center gap-4 border rounded-xl p-4 bg-white hover:shadow-md hover:border-foreground/20 transition-all"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={app.logo}
              alt={app.title}
              width={32}
              height={32}
              className="w-8 h-8 object-contain shrink-0"
            />
            <div>
              <p className="font-semibold text-sm">{app.title}</p>
              <p className="text-muted-foreground text-sm">{app.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
