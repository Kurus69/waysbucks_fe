const numbers = [1, 2, 3, 4, 5];


function Test() {

    return (
        <ul>
            {
                numbers.map(angka => (
                    <li key={angka.toString}>{angka}</li>
                ))
            }
        </ul>
    )
}
export default Test