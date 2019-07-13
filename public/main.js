window.onload = () => {
    //render initial chart on visiting the page
    let dataPoints = [];
    fetch('http://localhost:3000/poll')
        .then(res => res.json())
        .then(data => {
            const choices = data.choices;
            const choiceCounts = choices.reduce(
                (acc, choice) => (
                    (acc[choice.os] = (acc[choice.os] || 0) + choice.points), acc
                ),
                {}
            );
            for (const [key, value] of Object.entries(choiceCounts)) {
                dataPoints.push({label: key, y: value})
            }
        });

    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light1",
        title:{
            text: "Poll results"
        },
        data: [{
            type: "column",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: dataPoints
        }]
    });
    chart.render();


    //add a 'submit' event listener and subscribe to a 'submit' pusher event
    const pusher = new Pusher('688a74dc4a93f8e28a7e', {
        cluster: 'eu',
        forceTLS: true
    });

    const channel = pusher.subscribe('poll');
    channel.bind('submit', function(data) {
        dataPoints.forEach(dataPoint => {
            if (dataPoint.label === data.label) {
                dataPoint.y += data.points;
            }
        });
        chart.options.data[0].dataPoints = dataPoints;
        chart.render();
    });


    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        const choice = document.querySelector('input:checked').value;
        const data = {os: choice};

        fetch('http://localhost:3000/poll', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                chart.options.data[0].dataPoints = dataPoints;
                chart.render();
            })
            .catch(err => console.log(err));
        e.preventDefault();
    });


};
