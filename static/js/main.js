{
    // API config
    const api = {
      node_status: "/node_status",
      submit_pfb: "/submit_pfb",
      explorer: "https://testnet.mintscan.io/celestia-incentivized-testnet/",
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

    // create transaction
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      form.querySelector('.form_button').classList.toggle("loader");
      let tx_form = {
        "tx_data": form['tx_data'].value,
        "tx_gas_limit": form['tx_gas_limit'].value,
        "tx_fee": form['tx_fee'].value,
        "tx_node_url": form['tx_node_url'].value,
      };

      const connect = await fetch(api.submit_pfb, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(tx_form)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Data error');
      }).then(data => {
        document.getElementById("tx_info_date").textContent = data.date;
        document.getElementById("tx_info_namespace_id").innerHTML = data.namespace_id;
        document.getElementById("tx_info_height").innerHTML = data.height;
        // document.getElementById("tx_info_gas_wanted").innerHTML = data.gas_wanted;
        document.getElementById("tx_info_gas_used").innerHTML = data.gas_used;
        document.getElementById("tx_info_decode_data").innerHTML = data.data;
        document.getElementById("tx_info_encode_data").innerHTML = data.data_hex;
        document.getElementById("tx_info_tx_hash").innerHTML = data.txhash;
        document.getElementById("tx_info_code").innerHTML = data.code;
        document.getElementById("tx_info_tx_hash_link").setAttribute("href", api.explorer + "tx/" + data.txhash);
        document.querySelector(".btn_check_height").setAttribute("data-namespace", data.namespace_id);
        document.querySelector(".btn_check_height").setAttribute("data-height", data.height);

        let txblock = document.querySelector(".transaction");
        txblock.style.display = "block";

        let transaction_status_submitted = new Notify({
          status: 'success',
          title: 'Transaction submitted',
          text: '',
          effect: 'slide',
          type: 3,
          position: 'right bottom'
        });

        form.querySelector('.form_button').classList.toggle("loader");
        window.scrollTo(0, document.body.scrollHeight);

        return data;
      }).catch(err => {
        form.querySelector('.form_button').classList.toggle("loader");
        new Notify({
          status: 'error',
          title: 'Error',
          text: err.message,
          effect: 'slide',
          type: 3,
          position: 'right bottom'
        });
        console.log(err);
      });
    });
}
