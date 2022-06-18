module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            spacing: {},
            colors: {
                'dirtywhite': '#FCEFEF',
                'dirtydark': '#F3E3E3',
                'deepblue': '#14213D',
                'royal': '#554E4E',
                'dracula': '#2A2F35',
                'boregray': '#C4C4C4',
                'firered': '#DE6666',
                'oran': '#FCA311',


            },
            fontFamily: {
                title: "'Montserrat', sans-serif",
                subtitle: "'Lora', serif",
                content: "'Hind Madurai', sans-serif"

            },
            dropShadow: {
                'cs': '(0px 4px 4px rgba(0, 0, 0, 0.25))'
            },

        },
    },
    plugins: [],
}
