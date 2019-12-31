import React, { Component } from 'react';
import {
    Typography,
} from '@material-ui/core';

class ProductOverview extends Component {

    render() {

        return (
            <div>
                <Typography variant='h6' color="textSecondary">
                    Introducing the NEW 9th Gen Intel® Core™ desktop processors - the most powerful generation of Intel® Core™ desktop processors.
                </Typography>
                <br />
                <Typography varinat='body1' color="textSecondary" style={{ fontSize: 12 }}>
                    Introducing the NEW 9th Gen Intel® Core™ desktop processors - the most powerful generation of Intel® Core™ desktop processors. Whether you are a gamer looking for a fantastic in-game experience with the performance headroom for smooth live streaming and seamless highlights recording or you are a creator that is ready to do more creating and sharing, less time waiting, this new generation of processors is ready to take you to that new level.
                </Typography>
                <br />
                <Typography style={{ fontSize: 12, fontWeight: 'bold' }} variant='h6' color="textSecondary">
                    A New Level of Performance
                </Typography>
                <Typography varinat='body1' color="textSecondary" style={{ fontSize: 12 }}>
                    The 9th Gen Intel® Core™ processor takes mainstream desktop PC performance to a whole new level. At the top of the stack, our mainstream flagship, the new i9-9900K. The first Intel® Core™ i9 desktop processor for the mainstream users. Best in class, the i9-9900K with 16MB of cache1 and Intel® Turbo Boost 2.0 technology cranks maximum turbo frequency up to blazing 5.0 GHz. Throw in high performing 16-way multitasking support powered by 8 cores with Intel® Hyper-Threading Technology (Intel® HT Technology) to conquer the most demanding workloads. Want to reach for even greater levels of performance? — Overclock confidently with new and enhanced features like Solder Thermal Interface Material (STIM) and improved overclocking customizations to tweak the processor performance to its unleashed potential.2
                </Typography>
                <br />
                <Typography variant='h6' color="textSecondary">
                    Features and Performance
                </Typography>
                <br />
                <Typography style={{ fontSize: 15, fontWeight: 'bold' }} variant='h6' color="textSecondary">
                    Amazing Desktop Performance Built for Gaming
                </Typography>
                <Typography varinat='body1' color="textSecondary" style={{ fontSize: 12 }}>
                    The first 9th Gen Intel® Core™ i9 desktop processor with 8-cores and 16 threads, up to 5 GHz frequency and a fully unlocked.
                </Typography>
                <br />
                <Typography style={{ fontSize: 15, fontWeight: 'bold' }} variant='h6' color="textSecondary">
                    Amazing Mobile Performance
                </Typography>
                <Typography varinat='body1' color="textSecondary" style={{ fontSize: 12 }}>
                    The first mobile Intel® processor with up to 6-cores and 12 threads, featuring the new Intel® Thermal Velocity Boost (Intel® TVB) technology and a fully unlocked K-series SKU.
                </Typography>
                <br />
                <Typography style={{ fontSize: 15, fontWeight: 'bold' }} variant='h6' color="textSecondary">
                    Uncompromising Gaming and VR
                </Typography>
                <Typography varinat='body1' color="textSecondary" style={{ fontSize: 12 }}>
                    New levels of single, multi-threaded, and mega-tasking performance for the latest AAA games and VR. Experience faster game load with Intel® Optane™ technology, and faster wireless than gigabit Ethernet with Intel® Wireless-AC 2x2 160 MHz.
                </Typography>
                <br />
                <Typography style={{ fontSize: 15, fontWeight: 'bold' }} variant='h6' color="textSecondary">
                    Next-Level Content Creation
                </Typography>
                <Typography varinat='body1' color="textSecondary" style={{ fontSize: 12 }}>
                    Intel’s most powerful mobile platform for creators enables faster 4K video editing and faster media content loading from large HDD data drives with Intel® Optane™ memory.
                </Typography>
                <br />
                <Typography variant='h6' color="textSecondary">
                    Related Technologies
                </Typography>
                <br />
                <Typography style={{ fontSize: 15, fontWeight: 'bold' }} variant='h6' color="textSecondary">
                    Thunderbolt™ 3 Technology
                </Typography>
                <Typography varinat='body1' color="textSecondary" style={{ fontSize: 12 }}>
                    Remove the burden of multiple cables and get one compact port that does it all - power your PC, transfer data, and connect with dual 4K UHD displays.
                </Typography>
                <br />
                <Typography style={{ fontSize: 15, fontWeight: 'bold' }} variant='h6' color="textSecondary">
                    Intel® Optane™ Technology
                </Typography>
                <Typography varinat='body1' color="textSecondary" style={{ fontSize: 12 }}>
                    Eliminating bottlenecks requires better storage memory that is fast, inexpensive, and non-volatile. With Intel® Optane™ technology, you can unleash the power of your processor instead of it working at a fraction of it.
                </Typography>
                <br />
                <Typography style={{ fontSize: 15, fontWeight: 'bold' }} variant='h6' color="textSecondary">
                    Intel® Thermal Velocity Boost (Intel® TVB)
                </Typography>
                <Typography varinat='body1' color="textSecondary" style={{ fontSize: 12 }}>
                    Intel® Thermal Velocity Boost (Intel® TVB) is a new feature supported on Intel® Core™ i9-8950HK processor. It opportunistically and automatically increases clock frequency above single-core and multi-core Intel® Turbo Boost Technology 2.0 frequencies based on how much the processor is operating below its maximum temperature. The frequency gain and duration is dependent on the workload, capabilities of the processor and the processor cooling solution. For processors that have Intel® TVB enabled, the maximum Core Frequency is achieved while the processor is at a temperature of 50°C or lower and turbo power budget is available. Frequencies may reduce over time as processor temperature increases.
                </Typography>
            </div>
        );
    }
}

export default ProductOverview;