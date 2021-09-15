const ctx = document.getElementById('chart').getContext('2d');

constchart = new Chart(ctx, {
    
    type: 'doughnut',
 
    data: {
        labels: ["manfrine", "rilmar", "aline", "bruno"],
        datasets: [{
            label: "Candidatos",
            backgroundColor: [
                'rgba(0, 255, 0, 1)',
                'rgba(41, 128, 185,0.8)',
                'rgba(52, 73, 94,0.8)',
                'rgba(44, 62, 80,0.8)',
                
            ],
            borderColor: [
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)',
                'rgba(0, 0, 0, 1)', 
                'rgba(0, 0, 0, 1)', 
            ],
            data: [40, 10, 10, 10],
        }]
    },
    // Configuration options go here
    options: {
        animation : {
            duration : 2000,
            easing : 'easeOutBounce'
        },
        layout : {
            padding : {
                left : 20,
                right : 20,
                top : 20,
                bottom : 20
            }
        },
        legend : {
            display : true,
            position : 'bottom'
        },
        title : {
            display : true,
            text : 'Candidatos',
            fontSize : 20
        },
        tooltips : {
            enabled : true,
            intersect : true,
            backgroundColor : 'rgba(41, 128, 185,0.8)'
        },
       
    }
});

/*
const addData = () => {
    let sizeData = chart.data.datasets[0].data.length
    chart.data.datasets[0].data[sizeData] = Math.random() * 100
    chart.data.labels[sizeData] = `New Data ${sizeData + 1}`
    chart.update()
}

const removeData = () => {
    chart.data.datasets[0].data.pop()
    chart.data.labels.pop()
    chart.update()
}
*/ 