const calculateDensity = (meassuredArea: string, damagedArea: string) => {
    return (parseFloat(damagedArea) / parseFloat(meassuredArea)) * 100
}

export default calculateDensity