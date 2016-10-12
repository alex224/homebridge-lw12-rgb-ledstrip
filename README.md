# homebridge-lw12-rgb-ledstrip

Homebridge Plugin for Lacute LW-12 Wifi LED Strip Controller (https://www.amazon.de/gp/product/B00GMAS7U2)

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g git+https://github.com/alex224/homebridge-lw12-rgb-ledstrip.git
3. Update your configuration file. See sample-config.json in this repository for a sample. 

# Configuration

Configuration sample file:

 ```
"accessories": [
		{
			"accessory": "LW12-RGB",
			"name": "RGB Led Strip",
			"ip" : "192.168.1.59"
		}
    ]

```
