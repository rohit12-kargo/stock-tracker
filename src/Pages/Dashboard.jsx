import React, { useState } from 'react';
import momemt from 'moment';
import Typography from '../component/Typograph';
import Input from '../component/Input';
import { allNseStocks, topFiveStocks } from '../stockModal';

function Dashboard() {
    const [allStocks, setAllStocks] = useState(allNseStocks);

    const searchTables = searchvalue => {
        const flterData = allNseStocks.filter(stock => stock.symbol.toLowerCase().includes(searchvalue.toLowerCase()));
        if (flterData.length > 0) {
            setAllStocks(flterData);
        } else {
            setAllStocks(['stock not found']);
        }
    };
    return (
        <div className="flex-container">
            <div className="all-stock">
                <h2>All NSE Stocks</h2>
                <div className="search-input-div">
                    <Input className="search-input" placeholder="Search For Stocks" onChange={(event) => searchTables(event.target.value)} />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Last known price</th>
                            <th>Last Trade Date And Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allStocks.length && allStocks.map(el => (
                                <tr>
                                    <td><Typography.Text>{el.symbol}</Typography.Text></td>
                                    <td>{el.lastKnownPrice}</td>
                                    <td><Typography.Text>{el.datetimeOfLastPrice ? momemt(el.datetimeOfLastPrice).format('YYYY-MM-DD : HH:MM:SS') : null}</Typography.Text></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
            <div className="top-five-stocks">
                <h2>Top Five Stocks</h2>
                <table className="top-five-stocks-table">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Last known price</th>
                            <th>%CHNG</th>
                            <th>Last Trade Date And Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            topFiveStocks.length && topFiveStocks.map(el => (
                                <tr>
                                    <td><Typography.Text>{el.symbol}</Typography.Text></td>
                                    <td>{el.lastKnownPrice}</td>
                                    <td>{el.changeInPercentage}</td>
                                    <td><Typography.Text>{momemt(el.datetimeOfLastPrice).format('YYYY-MM-DD : HH:MM:SS')}</Typography.Text></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard
