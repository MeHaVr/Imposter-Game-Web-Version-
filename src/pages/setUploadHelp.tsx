function SetUploadHelp() {
  return (
    <div className="min-h-screen h-screen overflow-y-auto bg-black text-white">
      {/* Back Button */}
      <a
        href="/"
        className="fixed top-10 right-5 z-50 h-11 w-11 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition"
      >
        ✕
      </a>

      {/* Content */}
      <div
        className="max-w-full sm:max-w-[400px] mx-auto px-5 pt-20"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 40px)",
        }}
      >
        {/* Header */}
        <header className="text-center mb-8">
          <div className="text-5xl mb-3">🎭</div>
          <h1 className="text-3xl font-bold mb-2">Hilfe</h1>
          <p className="text-sm text-white/60">Wörter-Sets hochladen</p>
        </header>

        {/* Set hochladen */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
            Wörter-Set hochladen
          </div>
          <div className="text-xs text-white/40 mb-4">
            Erstelle eigene Wörter-Sets und teile sie mit anderen Spielern!
          </div>

          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
            So lädst du ein Set hoch:
          </div>
          <div className="space-y-2">
            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  1
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Öffne die Einstellungen
                  </div>
                  <div className="text-xs text-white/50">
                    Tippe auf das Menü-Symbol (☰) oben rechts im Spiel.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  2
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Erstelle eigene Wörter
                  </div>
                  <div className="text-xs text-white/50">
                    Füge im Bereich "Eigene Wörter" deine Wörter und Tipps
                    hinzu. Jedes Wort braucht einen Tipp.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  3
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Klicke auf "Set hochladen"
                  </div>
                  <div className="text-xs text-white/50">
                    Der Button erscheint, sobald du Wörter hast.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  4
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Fülle die Details aus
                  </div>
                  <div className="text-xs text-white/50">
                    Gib einen Titel (min. 3 Zeichen) und eine Beschreibung (min.
                    5 Zeichen) ein.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  5
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Wähle Sichtbarkeit
                  </div>
                  <div className="text-xs text-white/50">
                    <span className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-500 border border-blue-500/30 mr-1">
                      ÖFFENTLICH
                    </span>
                    <span className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-pink-500/15 text-pink-500 border border-pink-500/30">
                      PRIVAT
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  6
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Hochladen!
                  </div>
                  <div className="text-xs text-white/50">
                    Dein Set wird eingereicht.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nach dem Hochladen */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
            Nach dem Hochladen
          </div>

          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
            Öffentliche Sets
          </div>
          <div className="rounded-lg bg-amber-500/8 border border-amber-500/20 px-3 py-2 mb-3">
            <div className="text-xs text-white">
              <strong>⚠️ Wichtig:</strong> Öffentliche Sets müssen zuerst
              überprüft werden!
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  1
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Eingereicht
                  </div>
                  <div className="text-xs text-white/50">
                    Das Set kommt in die Warteschlange.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  2
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Admin-Benachrichtigung
                  </div>
                  <div className="text-xs text-white/50">
                    Ich bekomme eine Nachricht über dein Set.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  3
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Überprüfung
                  </div>
                  <div className="text-xs text-white/50">
                    Ich prüfe, ob die Wörter angemessen sind.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  4
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Freischaltung
                  </div>
                  <div className="text-xs text-white/50">
                    Wenn alles OK ist, wird dein Set für alle sichtbar!
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-green-500/8 border border-green-500/20 px-3 py-2 mb-3">
            <div className="text-xs text-white">
              <strong>✅ Geduld:</strong> Die Überprüfung kann etwas dauern.
              Danach können es alle nutzen!
            </div>
          </div>

          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
            Private Sets
          </div>
          <div className="rounded-lg bg-blue-500/8 border border-blue-500/20 px-3 py-2">
            <div className="text-xs text-white">
              <strong>🔒 Sofort verfügbar:</strong> Private Sets werden NICHT
              überprüft und sind sofort verwendbar – aber nur mit Code!
            </div>
          </div>
        </div>

        {/* Private Sets */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
            Private Sets
          </div>
          <div className="text-xs text-white/40 mb-4">
            Perfekt für Freunde, Familie oder deine Klasse!
          </div>

          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
            Set erstellen:
          </div>
          <div className="space-y-2 mb-3">
            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  1
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Aktiviere "Privat"
                  </div>
                  <div className="text-xs text-white/50">
                    Beim Hochladen die Checkbox ☑️ "Privat" aktivieren.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  2
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    5-stelliger Code
                  </div>
                  <div className="text-xs text-white/50">
                    Gib einen Zahlencode ein (z.B.{" "}
                    <code className="bg-white/10 px-1 py-0.5 rounded text-blue-500">
                      12345
                    </code>
                    ). ⚠️ Code gut merken!
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  3
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Hochladen
                  </div>
                  <div className="text-xs text-white/50">
                    Sofort verfügbar – ohne Wartezeit!
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
            Set verwenden:
          </div>
          <div className="space-y-2 mb-3">
            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  1
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Code teilen
                  </div>
                  <div className="text-xs text-white/50">
                    Gib deinen 5-stelligen Code weiter.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  2
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Code einlösen
                  </div>
                  <div className="text-xs text-white/50">
                    In den Einstellungen unter "Privat-Code" eingeben und auf
                    "Einlösen" tippen.
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/60 border border-blue-500/40 text-xs font-bold shrink-0">
                  3
                </span>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Sofort spielen!
                  </div>
                  <div className="text-xs text-white/50">
                    Die Wörter werden zu "Eigene Wörter" hinzugefügt.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-amber-500/8 border border-amber-500/20 px-3 py-2">
            <div className="text-xs text-white">
              <strong>💡 Tipp:</strong> Notiere dir deinen Code! Ohne ihn kannst
              du dein Set nicht wiederherstellen.
            </div>
          </div>
        </div>

        {/* Tipps */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-3">
            Tipps & Best Practices
          </div>

          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
            Gute Titel & Beschreibungen:
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 mb-2">
            <div className="text-sm font-semibold text-green-400 mb-1">
              ✅ Gut
            </div>
            <div className="text-xs text-white mb-1">
              <strong>"Tiere im Zoo – Safari-Edition"</strong>
            </div>
            <div className="text-xs text-white/50">
              Beschreibung: Wilde Tiere aus Afrika, Asien und Amerika. Perfekt
              für eine Runde mit Naturthema!
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 mb-3">
            <div className="text-sm font-semibold text-red-400 mb-1">
              ❌ Schlecht
            </div>
            <div className="text-xs text-white mb-1">
              <strong>"Mein Set"</strong>
            </div>
            <div className="text-xs text-white/50">Beschreibung: Wörter</div>
          </div>

          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
            Qualität der Wörter:
          </div>
          <div className="space-y-1 mb-3">
            <div className="flex items-start gap-2 text-xs text-white/50">
              <span>✅</span>
              <span>Abwechslungsreiche, interessante Wörter</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-white/50">
              <span>✅</span>
              <span>Gute, hilfreiche Tipps</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-white/50">
              <span>✅</span>
              <span>Thematisch zusammenhängend</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-white/50">
              <span>❌</span>
              <span>Keine beleidigenden Inhalte</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-white/50">
              <span>❌</span>
              <span>Nicht zu einfach/schwer mischen</span>
            </div>
          </div>

          <div className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2">
            Öffentlich vs. Privat:
          </div>
          <div className="space-y-2">
            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="mb-1">
                <span className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-500 border border-blue-500/30">
                  ÖFFENTLICH
                </span>
              </div>
              <div className="text-xs text-white/50">
                <strong>Vorteile:</strong> Teile mit allen, mehr Sichtbarkeit
                <br />
                <strong>Nachteil:</strong> Muss überprüft werden
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              <div className="mb-1">
                <span className="inline-block px-2 py-1 rounded-full text-[10px] font-semibold bg-pink-500/15 text-pink-500 border border-pink-500/30">
                  PRIVAT
                </span>
              </div>
              <div className="text-xs text-white/50">
                <strong>Vorteile:</strong> Sofort verfügbar, nur für ausgewählte
                Personen
                <br />
                <strong>Nachteil:</strong> Nur mit Code zugänglich
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 border-t border-white/10 mb-10">
          <p className="text-xs text-white/40 mb-3">
            Bei Fragen kannst du dich gerne melden!
          </p>
          <a
            href="https://github.com/MeHaVr/Imposter-Game-Web-Version-"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:border-white/20 transition"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <p className="text-[11px] text-white/30 mt-3">© 2026 Imposter Game</p>
        </div>
      </div>
    </div>
  );
}

export default SetUploadHelp;
