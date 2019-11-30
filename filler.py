from kafka import KafkaProducer
from datetime import datetime
import json
import os

def main():
    producer = KafkaProducer(
        bootstrap_servers="localhost:9092",
        value_serializer=lambda v: json.dumps(v).encode('utf-8'))

    topics = ['alarm', 'device', 'temperature_sensor', 'humidity_sensor', 'gas_sensor', 'light_sensor', 
    'temperature_sensor_data', 'humidity_sensor_data', 'gas_sensor_data', 'light_sensor_data']

    alarms = ['Будильник 1', 'Будильник 2']
    devices = ['Холодильник','Обогреватель','Вытяжка','Люстра']
    temperature_sensors = ['T809B900','T910C901','T920D1000']
    humidity_sensors = ['H810B910','H920C901','H930D1000']
    gas_sensors = ['G811B911','G921C901','G931D1000']
    light_sensors = ['L812B912','L922C901','L932D1000']

    print('Для начала работы введите любое число. Для выхода из программы введите -1')

    while(int(str.strip(input(">>>"))) != -1):
        os.system('cls')
        print('Выберите топик из списка [1-10]: ')
        for t in range(0, len(topics)):
            print(str(t + 1) + ". " + topics[t])

        t = int(str.strip(input(">>>"))) - 1

        topic = topics[t]

        os.system('cls')
        print('Вы выбрали топик: ' + topic)

        msg = {}

        if t == 0:

            for j in range(0, len(alarms)):
                print(str(j + 1) + ". " + alarms[j])
            
            print('Выберите будильник из списка [1-' + str(len(alarms)) +']:')
            while(True):
                a = str.strip(input('>>>'))
                
                if a.isdigit():
                    a = int(a) - 1

                if 0 <= a < len(alarms):
                    msg['name'] = alarms[a]
                    break
            
            print('Введите время в формате "чч:мм":')
            time = str.strip(input('>>>'))
            msg['time'] = time

            print('Введите состояние будильника 1 - вкл., 0 - выкл.:')
            
            while(True):
                state = str.strip(input('>>>'))
                if state.isdigit():
                    state = int(state)

                if 0 <= state <= 1:
                    msg['state'] = state
                    break

        elif t == 1:

            for j in range(0, len(devices)):
                print(str(j + 1) + ". " + devices[j])
            
            print('Выберите устройство из списка [1-' + str(len(devices)) +']:')
            while(True):
                d = str.strip(input('>>>'))

                if d.isdigit():
                    d = int(d) - 1
                if 0 <= d < len(devices):
                    msg['name'] = devices[d]
                    break

            print('Введите состояние устройства 1 - вкл., 0 - выкл.:')
            
            while(True):
                state = str.strip(input('>>>'))
                if state.isdigit():
                    state = int(state)

                if 0 <= state <= 1:
                    msg['state'] = state
                    break

        elif t == 2:

            for j in range(0, len(temperature_sensors)):
                print(str(j + 1) + ". " + temperature_sensors[j])
            
            print('Выберите датчик из списка [1-' + str(len(temperature_sensors)) +']:')
            while(True):
                ts = str.strip(input('>>>'))

                if ts.isdigit():
                    ts = int(ts) - 1
                if 0 <= ts < len(temperature_sensors):
                    msg['name'] = temperature_sensors[ts]
                    break

        elif t == 3:

            for j in range(0, len(humidity_sensors)):
                print(str(j + 1) + ". " + humidity_sensors[j])
            
            print('Выберите датчик из списка [1-' + str(len(humidity_sensors)) +']:')
            while(True):
                hs = str.strip(input('>>>'))

                if hs.isdigit():
                    hs = int(hs) - 1
                if 0 <= hs < len(humidity_sensors):
                    msg['name'] = humidity_sensors[hs]
                    break

        elif t == 4:

            for j in range(0, len(gas_sensors)):
                print(str(j + 1) + ". " + gas_sensors[j])
            
            print('Выберите датчик из списка [1-' + str(len(gas_sensors)) +']:')
            while(True):
                gs = str.strip(input('>>>'))

                if gs.isdigit():
                    gs = int(gs) - 1
                if 0 <= gs < len(gas_sensors):
                    msg['name'] = gas_sensors[gs]
                    break

        elif t == 5:

            for j in range(0, len(light_sensors)):
                print(str(j + 1) + ". " + light_sensors[j])
            
            print('Выберите датчик из списка [1-' + str(len(light_sensors)) +']:')
            while(True):
                ls = str.strip(input('>>>'))

                if ls.isdigit():
                    ls = int(ls) - 1
                if 0 <= ls < len(light_sensors):
                    msg['name'] = light_sensors[ls]
                    break

        elif t == 6:

            for j in range(0, len(temperature_sensors)):
                print(str(j + 1) + ". " + temperature_sensors[j])
            
            print('Выберите датчик из списка [1-' + str(len(temperature_sensors)) +']:')
            while(True):
                ts = str.strip(input('>>>'))

                if ts.isdigit():
                    ts = int(ts)
                if 0 <= ts <= len(temperature_sensors):
                    msg['temp_sensor'] = ts
                    break

            print('Введите значение температуры а градусах:')
            while(True):
                data = str.strip(input('>>>'))

                if data.isnumeric:
                    data = float(data)
                    msg['data'] = data
                    break

            msg['date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        elif t == 7:

            for j in range(0, len(humidity_sensors)):
                print(str(j + 1) + ". " + humidity_sensors[j])
            
            print('Выберите датчик из списка [1-' + str(len(humidity_sensors)) +']:')
            while(True):
                hs = str.strip(input('>>>'))

                if hs.isdigit():
                    hs = int(hs)
                if 0 <= hs <= len(humidity_sensors):
                    msg['hum_sensor'] = hs
                    break

            print('Введите значение влажности (0-100%):')
            while(True):
                data = str.strip(input('>>>'))

                if data.isnumeric:
                    data = float(data)
                    msg['data'] = data
                    break

            msg['date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        elif t == 8:

            for j in range(0, len(gas_sensors)):
                print(str(j + 1) + ". " + gas_sensors[j])
            
            print('Выберите датчик из списка [1-' + str(len(gas_sensors)) +']:')
            while(True):
                gs = str.strip(input('>>>'))

                if gs.isdigit():
                    gs = int(gs)
                if 0 <= gs <= len(gas_sensors):
                    msg['gas_sensor'] = gs
                    break

            print('Введите значение уровня углекислого газа (ppm):')
            while(True):
                data = str.strip(input('>>>'))

                if data.isnumeric:
                    data = float(data)
                    msg['data'] = data
                    break

            msg['date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        elif t == 9:

            for j in range(0, len(light_sensors)):
                print(str(j + 1) + ". " + light_sensors[j])
            
            print('Выберите датчик из списка [1-' + str(len(light_sensors)) +']:')
            while(True):
                ls = str.strip(input('>>>'))

                if ls.isdigit():
                    ls = int(ls)
                if 0 <= ls <= len(light_sensors):
                    msg['light_sensor'] = ls
                    break

            print('Введите значение освещённости (lux):')
            while(True):
                data = str.strip(input('>>>'))

                if data.isnumeric:
                    data = float(data)
                    msg['data'] = data
                    break

            msg['date'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        producer.send(topic, msg)
        os.system('cls')
        print('Для начала работы введите любое число. Для выхода из программы введите -1')
        continue


if __name__ == '__main__':
    main()
