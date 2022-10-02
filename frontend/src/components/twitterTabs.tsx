
//hi@stepbrobd.com

import { isPropertySignature } from "typescript";

type Props = {
    uid: number,
    stockName: string;
    tweet: string;
    dateTime: string;
    sentiment: boolean;
  };



  const TwitterTab = (props:Props) =>{

    var sentimentImage : any

    if(props.sentiment)
    {
        sentimentImage = <svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="27" rx="13.5" fill="#00B69B"/>
        </svg>
    }
    else{
        sentimentImage = <svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="27" rx="13.5" fill="#00B69B"/>
        </svg>

    }

    return (
      <>
        <div className="pr-3 mb-1 rounded-full mr-10 ml-10 flex items-center justify-between">

          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <rect width="44" height="44" fill="url(#pattern0)"/>
          <defs>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_815_2802" transform="scale(0.0111111)"/>
          </pattern>
          <image id="image0_815_2802" width="90" height="90" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAFXklEQVR4nO3cWahVVRzH8c+9plmZpkEDNtA8ExFNJDbYQNAIDQ9FD9EEBfUQNENQb8295EMFTVARIRU0EUlZCTZQYmalZFqGZWaKZFevPaxz8Xa73rPP3mvvdYf1hR/3cu7Z+//fv7v2Pmv9z1qLTCaTyWQymUwmk8lkMplMpkO6UidQM1MwE8fgQExuvb4Oy/A1PsT6JNmNcLpwEd5ED7a2UQ/ewAXKNbwuHFc56xHGTHylvbnb0xeY0UG8c/EZboyT/jZuQHfsk0ZgAh5Br/Im96kXD2OH7cTaBddhYev9f7Rei8aJrRM/EfOkEZiE91Q3eKDes83APXAFXsXGAe+7PfYFvdDv5HfFPnlJJmKu+Cb3aSEW2f6dssD2W34pdsJf/QL04tqYAUrynPpMbqe/cHTsCzprkEC9uC12oA64cpCcmtJGnD5IThOrXtQdQwR9RPP98cn4dYic6m7J5/bLpQsn40ncUvXCnmkT/EXsWDVIB9zZJp+69BkOwf7CHTUbK1t/e1+EHtlrBZL4HIdWDVSAcbZdXJPaLPSz1w7yt2XYM8bFvVUwmfW4OkbAIZhVMJem9DsOa5d00aa+ruD7JuFZPI/dCx7TKWfXdN4y/InzsSTWCR/X+X96DW4WuZ+JD0rkUodWq6HGcU2FhL7GGRFzSfF8HqglCjwuynB4hOTmChWyqp/MA4fATet1ofxaG99ESvRboTi1c8k8NkfKo6wmlMy7MLdHTng9XsKlOjN9sO5VkyrbQAozRfiUrSP5DXhF+PA8AeOHyGNxTTnUanSnQ+db8WiZQB3yN74UBkHLsQorWj8fwoUN5DAYW4RGsLXuQOMwX9oWlVJ/ljWu0x7AFlyCX8oGHOFsKHtgUaOP6vf7KqGbtqZs0BHMb3UH+FwYkV2FXVuvHY2l0t/OTerVsgYWbdGrhUL380IRZT5uwhxja07E0rIHFq1DrOr3+wSc1NJY44eyBxZt0fPKBhhlLCp7YNF+9D5CP3Yss0kYtG0qc3DRFr1S+EAcyyxQ0mQ660c/WDbIKKGxx+c4fC99FyuVzqluYXFmSF+mTKG1KpZHOx2Cz9NMUWm4MQf/NB10fCtw6lbWpM6P4lwJJggTvVMb0IRWa3Zy0P/YAfcZ/c/sB2IZVpXThCJ9akPqUI8wWBs29K0bmWt0tfBXYppUll1wJKb2e20azsNH0ptUVb04PoJPlZkolEy3Ct/xpTYmtl6OZ1UY7ZVlszCD8hTxp32lZjMuFxrSsGC6/y65GC2aHdMkqrVowrcrPRquA9TMb8Kkno2pExnIeMNnhmcMXRrXnrhMw3fSm1RVw6I71479ha96UptVVqtEWh7RBFPVs4q1bm3CqTX4UStdwjqWvj72SFD0RfNNMkVY8LlceiOH0lN1GdCfJhZiduNYYTXV8ULf+2Ds3UDsdswRBiY9qROpg1n4WfqW/LbEdea6mCxsQRFjT42qekeEddvDjW5hOe8v0hu8VdgOY1SZ3C08//p2akmtXtxtFG3YNR334Efpze3TBsN8aF2EvtmldwnTebdIb2x/zRN2JEjKULfRLBwklEHXCZW+nYTR33QcIKwePdbw/PT+G/cK81C2JM5lSLpxvVA2TN0qO9VbOCK+JfUyFfcLrTq1ge30qcG34BlR7C4Yvlp6QwfqY1xc36WnYUdh0dA8aQcfa/CY/64YG7XsJxSO5mtmPscKPI3LjLBBR8zO+27CrKUzheLRMbbtbluGf4T52IvxCd5VYQ1JauocJXUJWwkfLHQH98VewtSEvv0ueoTBxFrhi94N+EnYsmKpcJdkMplMJpPJZDKZTCaTyWQyY5N/AdKCSy6SF0A+AAAAAElFTkSuQmCC"/>
          </defs>
          </svg>
          <p>{props.stockName}</p>
          <p className="-ml-11">{props.tweet}</p>
          <p>{props.dateTime}</p>
          <p>{sentimentImage}</p>

        </div>
    </>

    );
};


export default TwitterTab;
