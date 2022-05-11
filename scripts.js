//Datlon Russell
// Fri Aprl 24th
// vue movies tickets
// creat ticket class
class ticket {
    constructor(title)
    {
    this.title = title;
    this.childTickets = 0
    this.adultTickets = 0
    }
    
}
// creat component with movie object
Vue.component('movie',{
    props: {movie: Object},
    template: 
    `<div class="card" style="width: 18rem;">
        <img v-bind:src= "'https://image.tmdb.org/t/p/w185' + movie.poster_path" class="card-img-top" alt="...">
        <div class="card-body">
            <h4>{{movie.original_title}}</h4>
            <p class="card-text">{{movie.overview}}</p>
            <button v-on:click="$emit('adultplus',movie)">get ticket</button>
            <button v-on:click="$emit('childplus',movie)">get child ticket</button>
        </div>
    </div>`
})

Vue.component ('total',{
    props:['children','adults'],
    template: 
    `<div>
    <h2>total</h2>
    <p>Adult tickets total: $ {{adults * 6.99}}</p>
    <p>Children's tickets total: $ {{children * 3.99}}</p>
    </div>`
})

// creat component for ticket
Vue.component('ticket',{
    props: {ticket: Object},
    data: function () {
        return {
            childcount: this.ticket.childTickets,
            adultcount: this.ticket.adultTickets
          }
        },
    
    template:
    `
    <div class="card">
  <div class="card-header">
    {{ticket.title}}
  </div>
  <div class="card-body">
        <blockquote class="blockquote mb-0">
         <p>Chilid tickets:{{ticket.childTickets}},$ {{ticket.childTickets * 3.99}} Adult Tickets:{{ticket.adultTickets}} $ {{ticket.adultTickets * 6.99}}</p>
         <button v-on:click="$emit('adultminus',ticket)">-Adult</button> 
         <button v-on:click="$emit('childminus',ticket)">-Child</button> 
         <button v-on:click="$emit('scrap',ticket)">DELEAT</button>
        </blockquote>
        </div>
    </div>
    `
})

// creat new Vue instince
const app= new Vue({
    el: "#app",
    data: {
        // message
        message: "upcoming movies",
        
        // tickets array
        tickets: [],
        // properties
        movies: [],

        adultTickets: 0,

        childTickets: 0,
    },
    // mounted function to fill properties
    mounted: function () {
        this.$nextTick(function () {
          this.useAPI();
        })
      },
    methods:{
        
        // api get
        useAPI(){
            axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=7c0def495914433614f8c6b1889d9136&language=en-US&page=1")
            .then((response) => {

                console.log(response);
                for (i = 0; i < 3; i++){
                    this.movies.push(response.data.results[i])
                }
                for (i = 0; i < 3; i++){
                    tic = new ticket(this.movies[i].original_title)
                    this.tickets.push(tic);
                }
            })
        },
        addChild(movie){
            const x = this.movies.indexOf(movie);
            this.tickets[x].childTickets += 1;
            this.childTickets +=1;
        },
        addAdult(movie){
            const x = this.movies.indexOf(movie);
            this.tickets[x].adultTickets += 1;
            this.adultTickets +=1;
            
        },
        minusChild(ticket){
            const x = this.tickets.indexOf(ticket);
            this.tickets[x].childTickets -= 1;
            if (this.tickets[x].childTickets < 0) {
                this.tickets[x].childTickets = 0;
            }
            this.childTickets -=1;
            if (this.childTickets < 0) {
                this.childTickets = 0;
            }
        },
        minusAdult(ticket){
            const x = this.tickets.indexOf(ticket);
            this.tickets[x].adultTickets -= 1;
            if (this.tickets[x].adultTickets < 0) {
                this.tickets[x].adultTickets = 0;
            }
            this.adultTickets -=1;
            if (this.adultTickets < 0) {
                this.adultTickets = 0;
            }
        },
        scrap(ticket){
            const x = this.tickets.indexOf(ticket);
            this.adultTickets -= this.tickets[x].adultTickets;
            this.tickets[x].adultTickets = 0;
            this.tickets[x].childTickets -= this.tickets[x].childTickets;
            this.tickets[x].childTickets = 0;

        }
    }

        

})