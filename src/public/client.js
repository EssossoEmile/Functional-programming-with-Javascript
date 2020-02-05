let store = {
        user: { name: "MARS DASHBOARD" },
        rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    }
//declaring global variables
let count = 0;
let rov_in = 0
let info;


// add our markup to the page
const root = document.getElementById('root')
const launch_date = document.getElementById('launch')
const latest_photo = document.getElementById("photo")
const latest_date = document.getElementById("date")
const landing_date = document.getElementById('landing')
const status = document.getElementById('status')


const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async(root, state) => {
    root.innerHTML = App(state)
}

const TabContentP = () => {
    return `
        <p><strong>Launch Date</strong>: <strong class="launch" style="color:yellow"> </strong></p><br />
        <p><strong>Landing Date</strong>: <strong class="landing" style="color:yellow"></strong></p><br />
        <p><strong>Rover Status</strong>: <strong class="status" style="color:yellow"></strong></p><br />
        <p><strong>Recent Photo Earth Date</strong>: <strong class="recent" style="color:yellow"></strong></p><br />
        <p><strong style="color:yellow">Recent Photos</strong></p><br />

        <div class="slider-container">
        <div class="roverImage"></div>
        <button onClick="ImageSlider(event, 'prev')" class="prev" style="color:yellow">P</button>
        <button onClick="ImageSlider(event, 'next')" class="next" style="color:yellow">N</button>
        </div>
        `
}

const CuriosityContent = () => {
    return `
        <h1 style = "text-align: center; color: yellow">Curiosity</h1><br />
        <p> Curiosity, is the most ambitious Mars mission yet flown by NASA.
        The rover landed on Mars in 2012 with a primary mission to find out if Mars is,
        or was, suitable for life. Another objective is to learn more about the Red Planet's environment.
        In March 2018, it celebrated 2,000 sols (Mars days) on the planet, making its way from Gale Crater
        to Aeolis Mons (colloquially called Mount Sharp), where it has looked at geological information embedded
        in the mountain's layers</p><br />
        `
}

const OpportunityContent = () => {
    return `
        <h1 style = "text-align: center; color:yellow">Opportunity</h1><br />
        <p>Opportunity, also known as MER-B (Mars Exploration Rover – B) or MER-1,
        and nicknamed "Oppy",is a robotic rover that was active on Mars from 2004 until
        the middle of 2018. Launched on July 7, 2003, as part of NASA's Mars Exploration
        Rover program, it landed in Meridiani Planum on January 25, 2004, three weeks after
        its twin Spirit (MER-A) touched down on the other side of the planet. With a planned
        90-sol duration of activity (slightly more than 90 Earth days), Spirit functioned until
        it got stuck in 2009 and ceased communications in 2010, while Opportunity was able to stay
        operational for 5111 sols after landing.</p><br />
        `
}

const SpiritContent = () => {
    return `
        <h1 style = "text-align: center; color:yellow">Spirit</h1><br />
        <p>Spirit, also known as MER-A (Mars Exploration Rover – A) or MER-2, is a robotic
        rover on Mars, active from 2004 to 2010. It was one of two rovers of NASA's Mars
        Exploration Rover Mission. It landed successfully within the impact crater Gusev on
        Mars at 04:35 Ground UTC on January 4, 2004, three weeks before its twin, Opportunity
        (MER-B), which landed on the other side of the planet. The rover became stuck in a "sand trap"
        in late 2009 at an angle that hampered recharging of its batteries; its last communication with
        Earth was sent on March 22, 2010..</p><br />
        `
}

const OnClickButton = (nam) => {
    return `
        <div class="btn"><button class = "close" onclick = "document.getElementById(nam).style.display='none'">close</button></div>
        `
}

const TabContent = () => {
                return `
                    <div id="Curiosity" class="tabcontent">
                        ${CuriosityContent()}
                        ${TabContentP()}
                        ${OnClickButton(store.rovers[0])}
                    </div>

                    <div id="Opportunity" class="tabcontent">
                        ${OpportunityContent()}
                        ${TabContentP()}
                        ${OnClickButton(store.rovers[1])}
                    </div>

                    <div id="Spirit" class="tabcontent">
                        ${SpiritContent()}
                        ${TabContentP()}
                        ${OnClickButton(store.rovers[2])}
                    </div>`
}


// create content
const App = (state) => {
    let { rovers } = state

    return `
        <header>
        <div class="tabs">
        <ul>
         <li><button class="tablinks" onclick ="popInfo(event, '${store.rovers[0]}')">Curiosity</button></li>
         <li><button class="tablinks" onclick ="popInfo(event, '${store.rovers[1]}')">Opportunity</button></li>
         <li><button class="tablinks" onclick ="popInfo(event, '${store.rovers[2]}')">Spirit</button></li>
         </ul>
         <p style="padding-top:30px;">${Greeting(store.user.name)}</p>
        </header>
        <main>
             <h1 class="head">MARS EXPLORATION</h1>
             <section class="container">
             <div class="aside">
              <h1 style="color: yellow"> MISSION STATEMENT </h1><br />
              <p class="statement">The goal of the Mars Exploration Program is to explore Mars and to provide a continuous 
                flow of scientific information and discovery through a carefully selected series of robotic orbiters,
                landers and mobile laboratories interconnected by a high-bandwidth Mars/Earth communications network.</P>
             </div>
             ${TabContent()}
             </section> 
          </main>  
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
        if (name) {
            return `
            <h1>WELCOME TO ${name}</h1>
        `
        }
        return `
        <h1>Hello!</h1>
    `
    }
    // ------------------------------------------------------  API CAL
    // API Call on rovers
const getRoverDetails = async(rover_name) => {

    await fetch(`http://localhost:3000/rover/${rover_name}`)
        .then(res => res.json())
        .then((data) => {
            let details = []

            let images = data.rover_details.photos.map((image) => {
                    return image.img_src
                }) // passing the all the images into an array

            details.push([ // putting all info into an array including the image array
                data.rover_details.photos[0].rover.launch_date,
                data.rover_details.photos[0].rover.landing_date,
                data.rover_details.photos[0].rover.status,
                data.rover_details.photos[0].rover.max_date,
                images
            ])

            info = details
        });
}

// function to slide the images 
const ImageSlider = async(evt, rover_img) => {
    const launch = info["0"][0]
    const landing = info["0"][1]
    const status = info["0"][2]
    const recent = info["0"][3]
    const img_src = info["0"][4][0]
    const tot_images = info["0"][4].length


    document.getElementsByClassName('launch')[rov_in].innerHTML = `${launch}`
    document.getElementsByClassName('landing')[rov_in].innerHTML = `${landing}`
    document.getElementsByClassName('status')[rov_in].innerHTML = `${status}`
    document.getElementsByClassName('recent')[rov_in].innerHTML = `${recent}`
    document.getElementsByClassName('roverImage')[rov_in].innerHTML = `<img src="${img_src}" height="250px" width="100%" />`

    const { Map } = require('immutable');
    const map1 = Immutable.Map({ a: 'next' });
    const map2 = map1.set('a', 'prev');

    if (rover_img == map1.get('a')) {
        count++
        if (count >= tot_images) {
            count = count % tot_images
        }
        img_src = info["0"][4][count]

        document.getElementsByClassName('roverImage')[rov_in].innerHTML = `<img src="${img_src}"  height="250px" width="100%" />`
    }
    if (rover_img == map2.get('a')) {
        count--
        if (count < 0) {
            count = tot_images - 1
        }
        img_src = info["0"][4][count]

        document.getElementsByClassName('roverImage')[rov_in].innerHTML = `<img src="${img_src}"  height="250px" width="100%" />`
    }

}



// function for tab information
const popInfo = async(evt, rover_name) => {

    await getRoverDetails(rover_name).then(() => {});

    const tabcontent = document.getElementsByClassName("tabcontent");

    Array.prototype.forEach.call( tabcontent, dis => {
        dis.style.display = "none";
    });

    const tablinks = document.getElementsByClassName("tablinks");

    Array.prototype.forEach.call( tablinks, lik => {
        lik.className = lik.className.replace(" active", "");
    });

    document.getElementById(rover_name).style.display = "block";
    let next_rover_name = []

    Array.prototype.forEach.call( store.rovers, rv => {
        next_rover_name.push(rv);
    });


    if (rover_name == next_rover_name[0]) { rov_in = 0 }
    if (rover_name == next_rover_name[1]) { rov_in = 1 }
    if (rover_name == next_rover_name[2]) { rov_in = 2 }

    const launch = info["0"][0]
    const landing = info["0"][1]
    const status = info["0"][2]
    const recent = info["0"][3]
    const img_src = info["0"][4][0]


    document.getElementsByClassName('launch')[rov_in].innerHTML = `${launch}`
    document.getElementsByClassName('landing')[rov_in].innerHTML = `${landing}`
    document.getElementsByClassName('status')[rov_in].innerHTML = `${status}`
    document.getElementsByClassName('recent')[rov_in].innerHTML = `${recent}`
    document.getElementsByClassName('roverImage')[rov_in].innerHTML = `<img src="${img_src}"  height="250px" width="100%" />`

}