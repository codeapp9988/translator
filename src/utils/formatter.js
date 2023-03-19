import moment from "moment";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function shortenAddress(address) {
    var trimmedString = "";
    if (address === "")
        return "unknown";
    if (address != null || address.length > 16) {
        trimmedString = (address.substring(0, 8) + "..." + address.substring(address.length - 5));
    }
    else {
        trimmedString = address ?? "";
    }
    return trimmedString;
}

export function getRelativetime(ISOString) {
    return moment(ISOString).fromNow();
}

export function getFullTime(ISOString) {
    return (moment(ISOString).format('lll') + " (UTC)");
}

export function formatLamports(value) {
    try {
        if (typeof value === "number")
            return (parseFloat(value) / LAMPORTS_PER_SOL);
        else
            return value;
    } catch (error) {
        return value;
    }

}

export function formatNames(name) {
    try {
        if (name.includes("_")) {
            var words = name.split("_");
            var capitalizedText = "";
            for (let index = 0; index < words.length; index++) {
                capitalizedText += capitalizeText(words[index]) + " ";
            }
            return capitalizedText;
        }
        else
            return (capitalizeText(name))
    } catch (error) {
        return name;
    }

}
function capitalizeText(text) {
    try {
        if (text === "NFT")
            return "NFT";
        else if (text === "SOL")
            return "SOL";
        else
            return text[0].toUpperCase() + text.substring(1).toLowerCase();
    } catch (error) {
        return text;
    }

}

export function convertToDays(value)
{
    try {
        if(value)
        {
            var seconds = Number(value);
            var d = Math.floor(seconds / (3600*24));
            var h = Math.floor(seconds % (3600*24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);

            var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }
        else
            return null;
        
    } catch (error) {
        return value;
    }
}