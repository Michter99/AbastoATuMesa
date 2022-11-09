const Pedido = ({ pedidoInfo }) => {

    return (
        <div className="mt-3 col-md-12">
            <div className="pedido">
                <h3>{pedidoInfo[0].fecha_de_pedido.split('T')[0]}</h3>
                <p style={{ color: "black", fontWeight: "700" }}>ID orden: {pedidoInfo[0].id_orden}</p>
                {pedidoInfo.map(pedido => {
                    return (
                        <p key={pedido.producto}>{pedido.cantidad} kg {pedido.producto}</p>
                    )
                })}
                <h5>{pedidoInfo[0].estado}</h5>
                <h4>$ {pedidoInfo[0].total}</h4>
            </div>
        </div>
    );
}

export default Pedido;