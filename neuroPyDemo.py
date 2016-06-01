from NeuroPy import NeuroPy

object1=NeuroPy("COM3") #If port not given 57600 is automatically assumed

#object1=NeuroPy("/dev/rfcomm0") for linux
def attention_callback(attention_value):
    "this function will be called everytime NeuroPy has a new value for attention"
    print "Value of attention is",attention_value
#do other stuff (fire a rocket), based on the obtained value of attention_value
#do some more stuff
    return None

#set call back:
object1.setCallBack("attention",attention_callback)

#call start method
object1.start()

attention_callback(object1.attention)
