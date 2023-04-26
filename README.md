# UI for celestia to submitting PayForBlob transaction

You can use this project to send data to the celestia network.

At first, you need to run a [Celestia Node](https://docs.celestia.org/nodes/light-node/).

## How to run?

1) Install the required dependencies:
   
```
pip install Flask==2.2.3
pip install requests==2.28.2

```
2) config.py:

    2.1)  ```DEFAULT_NODE_URL``` : the celestia local light node address

    2.2)  ```DEFAULT_GAS_LIMIT``` : default gas limit

    2.3)  ```DEFAULT_FEE``` : default gas fee

3) Run script:
```
python main.py
```

4) Go to http://127.0.0.1:5000 and submit pfb transaction.
