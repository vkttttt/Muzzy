<input 
    type="hidden" 
    value="<?php echo $data['deleteCoffee']['idshop']; ?>"
    id="adminCoffeeEditForm_id"
    >

<div class="form-group">
    <label for="adminCoffeeEditForm_shopname">Tên quán</label>
    <input 
        class="form-control" 
        type="text"
        id="adminCoffeeEditForm_shopname" 
        value="<?php echo $data['deleteCoffee']['shopname']; ?>"
        >
</div>


<div class="form-group">
    <label for="adminCoffeeEditForm_ownername">Tên chủ quán</label>
    <input 
        class="form-control" 
        type="text"
        id="adminCoffeeEditForm_ownername"
        value="<?php echo $data['deleteCoffee']['ownername']; ?>"
        disabled>
</div>

<div class="form-group">
    <label for="adminCoffeeEditForm_address">Địa chỉ</label>
    <textarea 
        class="form-control" 
        id="adminCoffeeEditForm_address" 
        rows="3"><?php echo $data['deleteCoffee']['shopaddress']; ?></textarea>
</div>
<hr>

<div class="form-group">
    <label for="adminCoffeeEditForm_description">Mô tả</label>
    <textarea 
        class="form-control" 
        id="adminCoffeeEditForm_description" 
        rows="3"><?php echo $data['deleteCoffee']['description']; ?></textarea>
</div>

<div class="form-group">
    <label for="adminCoffeeEditForm_dateopening">Ngày khai trương</label>
    <input 
        class="form-control" 
        type="date" 
        id="adminCoffeeEditForm_dateopening"
        value="<?php echo $data['deleteCoffee']['dateopening']; ?>"
        disabled>
</div>

<div class="row">
    <div class="col-6">
        <div class="form-group">
            <label for="adminCoffeeEditForm_timeopen">Giờ mở cửa</label>
            <input 
                class="form-control" 
                type="time" 
                id="adminCoffeeEditForm_timeopen"
                value="<?php echo $data['deleteCoffee']['timeopen']; ?>"
                >

        </div>
    </div>
    <div class="col-6">
        <div class="form-group">
            <label for="adminCoffeeEditForm_timeclose">Giờ đóng cửa</label>
            <input 
                class="form-control" 
                type="time" 
                id="adminCoffeeEditForm_timeclose"
                value="<?php echo $data['deleteCoffee']['timeclose']; ?>"
                >
        </div>
    </div>
</div>

<div class="form-group">
    <label for="adminCoffeeEditForm_discount">Giảm giá</label>
    <input 
        class="form-control" 
        type="number" 
        id="adminCoffeeEditForm_discount"
        value="<?php echo $data['deleteCoffee']['discount']; ?>"
        >
</div>