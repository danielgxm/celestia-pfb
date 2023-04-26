{
    // API config
    const api = {
      node_status: "/node_status",
    };

    // form selector
    const form = document.body.querySelector("form");

    // btn tx block height
    const btn_block_height = document.body.querySelector(".btn_check_height");

    // check node status
    document.body.onload = async (e) => {
      const node_status = await fetch(api.node_status)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Data error');
      }).then(data => {
        document.body.querySelector(".node_status").classList.toggle("active");
        document.body.querySelector(".node_status").textContent = 'active';
        return data;
      }).catch(err => {
        document.body.querySelector(".node_status").classList.toggle("inactive");
        document.body.querySelector(".node_status").textContent = 'inactive';
        form.querySelector('.form_button').classList.toggle("inactive");
        form.querySelector('.form_button').textContent = "Node is inactive";
        new Notify({
          status: 'error',
          title: 'Error',
          text: 'Node is inactive, Please run a node!',
          effect: 'slide',
          type: 3,
          position: 'right top'
        });
        console.log(err);
      });
    };
}
