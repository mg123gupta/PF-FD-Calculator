import React, { Component } from "react";
import Graphics from "./Graphics";

type MyState = {
  tab: number;
  totalInv: number;
  roi: number;
  timePeriod: number;
  selectedPeriod: number
};

export default class Form extends Component {
  state: MyState = {
    tab: 1,
    totalInv: 5000,
    roi: 1,
    timePeriod: 1,
    selectedPeriod: 1,
  };

  handleClick = (tabNum: number) => {
    if (this.state.tab !== tabNum) {
      this.setState({
        tab: tabNum,
        roi: tabNum === 2 ? 7.1 : 1,
        timePeriod: tabNum === 2 ? 15 : 1,
      });
    }
  };

  handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const {name, value}=e.target as HTMLInputElement
    this.setState({ [name]: parseInt(value) });
  };

  handleReturn = () => {
    const {
      totalInv: principalAmt,
      roi: rate,
      timePeriod: time,
      selectedPeriod,
    } = this.state;
    const mm: number = (principalAmt * rate * time) / selectedPeriod / 100;
    const maturityPPF: number =
      principalAmt * (((1 + rate / 100) ** time - 1) / (rate / 100));
    return this.state.tab === 2 ? maturityPPF : mm;

    // f=P[({(1+i)^n}-1)/i]
  };
  selectoption = (e: React.FormEvent<HTMLInputElement>) => {
    const {value}=e.target as HTMLInputElement
    const val: number = parseInt(value);
    this.setState({
      selectedPeriod: val,
    });
  };

  render() {
    const { tab, totalInv, timePeriod, selectedPeriod } = this.state;
    console.log(selectedPeriod);
    const estReturn = this.handleReturn();
    const data: object = [
      {
        name: "Total Amount",
        value: totalInv + estReturn,
      },
      {
        name: "Total returns",
        value: tab === 1 ? estReturn : estReturn - totalInv * timePeriod,
      },
    ];

    // {`${tab? bg-[#5867F6]:bg-[#9AA4F8]}`}
    return (
      <div className="sm:min-h-[100vh] max-w-full flex justify-center items-center flex-col">
        <div
          className={`w-full lg:w-[60%] flex text-center border font-semibold ${
            tab ? "bg-[#5867F6]" : "bg-[#9AA4F8]"
          }`}
        >
          <button data-testid="fd-btn" className={` w-1/2  text-white p-3 ${
              tab === 1 ? "bg-[#5867F6]" : "bg-[#9AA4F8]"
            }`}
            onClick={() => this.handleClick(1)}
          >
            FD Calculator
          </button>
          <button
            className={`w-1/2  text-white p-3 ${
              tab === 2 ? "bg-[#5867F6]" : "bg-[#9AA4F8]"
            }`}
            onClick={() => this.handleClick(2)}
          >
            PPF Calculator
          </button>
        </div>
        <div className="w-full lg:w-[60%] mx-0 sm:mx-auto sm:flex border p-5 sm:p-10 justify-center gap-10">
          <div className="w-full ">
            <div>
              <div className="flex justify-between">
                <span>
                  {tab === 2 ? "Yearly investment" : "Total Investmet"}
                </span>
                <div className="bg-green-300 grid grid-cols-2 w-[113px] ">
                  <span className=" inline-block justify-self-center self-center w-0">
                    &#8377;
                  </span>
                  <input id="total-investment"
                    type="number"
                    min={1}
                    className="bg-green-300 focus:outline-none font-thin"
                    onChange={(e) => this.handleInput(e)}
                    value={this.state.totalInv}
                    name="totalInv"
                  />
                </div>
              </div>
              <div className="w-full pt-6 pb-4">
                <input
                  type="range"
                  min={tab === 1 ? "5000" : "500"}
                  className="w-full"
                  max={tab === 1 ? "10000000" : "150000"}
                  value={this.state.totalInv}
                  onChange={(e) => this.handleInput(e)}
                  name="totalInv"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between ">
                <span>
                  {tab === 2 ? "Rate of interest" : "Rate of interest (p.a)"}
                </span>
                <div
                  className={`flex text-center  pr-5 w-[100px] ${
                    tab === 2 ? "mb-10 bg-gray-300" : "bg-green-300"
                  }`}
                >
                  <input
                    type="number"
                    min={1}
                    className={`bg-green-300 w-[80px] focus:outline-none text-right pr-3 ${
                      tab === 2 ? " bg-gray-300" : "bg-green-300"
                    }`}
                    value={this.state.roi}
                    name="roi"
                    onChange={(e) => this.handleInput(e)}
                    disabled={tab === 2 ? true : false}
                  />
                  <span className="inline-block justify-self-center self-center">
                    %
                  </span>
                </div>
              </div>

              {tab === 2 ? null : (
                <div className="w-full pt-6 pb-4">
                  <input
                    type="range"
                    step="0.01"
                    min="1"
                    max={tab === 1 ? 15 : 50}
                    className="w-full"
                    name="roi"
                    onChange={(e) => this.handleInput(e)}
                    value={this.state.roi}
                  />
                </div>
              )}
            </div>
            <div>
              <div className="flex justify-between gap-5 items-end">
                <div className="grid grid-cols-2 gap-2">
                  <span>
                    {tab === 2 ? "Time period(in years)" : "Time period"}
                  </span>
                  {tab === 1 ? (
                    <select
                      value={selectedPeriod}
                      onChange={(e: React.FormEvent<HTMLInputElement>)=> this.selectoption(e)}
                    >
                      <option value={1}>Years</option>
                      <option value={12}>Months</option>
                      <option value={365}>Days</option>
                    </select>
                  ) : null}
                </div>

                <div className="bg-green-300 flex pr-5">
                  <input
                    className="bg-green-300 w-[80px] focus:outline-none text-right pr-3"
                    type="number"
                    min={1}
                    name="timePeriod"
                    onChange={(e) => this.handleInput(e)}
                    value={this.state.timePeriod}
                  />
                </div>
              </div>
              <div className="w-full pt-6 pb-4">
                <input
                  type="range"
                  min={tab === 1 ? 1 : 15}
                  max={tab === 1 ? 25 : 50}
                  className="w-full"
                  name="timePeriod"
                  onChange={(e) => this.handleInput(e)}
                  value={this.state.timePeriod}
                />
              </div>
            </div>
            <div className="">
              <div className="flex justify-between pb-4">
                <span className="text-slate-500">Invested amount </span>
                <div>
                  <span> &#8377;</span>
                  <span className="text-center w-[18%] ml-1">
                    {tab === 2 ? totalInv * timePeriod : totalInv}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pb-4">
                <span className="text-slate-500">
                  {tab === 2 ? "Total Interest" : "Est returns"}
                </span>
                <div>
                  <span> &#8377;</span>
                  <span className="text-center w-[18%] ml-1">
                    {tab === 2
                      ? (estReturn - totalInv * timePeriod).toFixed(0)
                      : estReturn.toFixed(0)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between pb-4">
                <span className="text-slate-500">
                  {tab === 2 ? "Maturity value" : "Total value"}
                </span>
                <div>
                  <span> &#8377;</span>
                  <span className="text-center w-[18%] ml-1">
                    {(totalInv + estReturn).toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center flex-col items-center gap-5 ">
            <div className="flex text-[10px] sm:text-xs">
              <span className="bottom-1 w-4 sm:w-6 h-2 sm:h-3 bg-[#00d09c] rounded-lg inline-block mr-2 self-center"></span>
              <span className="">Total Investment</span>
              <span className="bottom-1 w-4 sm:w-6 h-2 sm:h-3 bg-sky-600 rounded-lg inline-block mr-2 ml-4 self-center"></span>
              <span className="">Total returns</span>
            </div>
            <div className="flex justify-center items-center">
              <Graphics data={data} />
            </div>
            <button className=" px-6 py-3 bg-[#00d09c] text-white rounded-md font-semibold">
              {tab === 2 ? "SAVE NOW" : "Invest Now"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
