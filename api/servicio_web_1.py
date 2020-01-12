import mysql.connector
import flask
import smtplib
import time
from flask import request, jsonify, Flask, redirect, url_for, render_template
from flask_cors import CORS, cross_origin
from datetime import date, datetime, timedelta
import jsonplus as json


app = flask.Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

def listPacientes():
    pacientes=[]
    pacientes.append()
    return pacientes

#GET Pacientes
@app.route('/pacientes', methods=['GET'])
def getPacientes():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT * from medicinaingsw.paciente
                ORDER BY medicinaingsw.paciente.apellidos"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        pacientes = jsonify(records)
        return pacientes
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#POST Paciente
@app.route('/pacientes/ingresarpaciente', methods=['POST'])
def postPaciente():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        rut_paciente = data['rut_paciente']
        dig_verif = data['dig_verif']
        nombres = data['nombres']
        apellidos = data['apellidos']
        direccion = data['direccion']
        cor_elec = data['cor_elec']
        comuna = data['comuna']
        fono = data['fono']
        id_prevision = data['id_prevision']
        fec_nacim = data['fec_nacim']
        sexo = data['sexo']
        edad_menarq = data['edad_menarq']
        fec_menarq = data['fec_menarq']
        actividad = data['actividad']
        deporte = data['deporte']
        fec_ingreso = data['fec_ingreso']
        tiempo_libre = data['tiempo_libre']
        rendimiento = data['rendimiento']
        prof_futuro = data['prof_futuro']

        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = "INSERT INTO medicinaingsw.paciente (rut_paciente, dig_verif, nombres, apellidos, direccion, cor_elec, comuna, fono, id_prevision, fec_nacim, sexo, edad_menarq, fec_menarq, actividad, deporte, fec_ingreso, tiempo_libre, rendimiento, prof_futuro) VALUES (%s,%s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            values = (rut_paciente,dig_verif,nombres,apellidos,direccion,cor_elec,comuna,fono,id_prevision,fec_nacim,sexo,edad_menarq,fec_menarq,actividad,deporte,fec_ingreso,tiempo_libre,rendimiento,prof_futuro)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Paciente creado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#DELETE Paciente
@app.route('/pacientes/eliminarpaciente/<string:rut>', methods=['DELETE'])
def deletePaciente(rut):
    if request.method == 'DELETE':
        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = "DELETE FROM medicinaingsw.paciente WHERE rut_paciente = " + rut
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query)
            connection.commit()
            connection.close()
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#POST Paciente
@app.route('/pacientes/actualizarpaciente/<string:rut_paciente>', methods=['PATCH'])
def updatePaciente(rut_paciente):
    if request.method == 'PATCH':
        data = request.get_json()
        print(data)
        rut_paciente = data['rut_paciente']
        nombres = data['nombres']
        apellidos = data['apellidos']
        direccion = data['direccion']
        cor_elec = data['cor_elec']
        comuna = data['comuna']
        fono = data['fono']
        id_prevision = data['id_prevision']
        fec_nacim = data['fec_nacim']
        sexo = data['sexo']
        edad_menarq = data['edad_menarq']
        fec_menarq = data['fec_menarq']
        actividad = data['actividad']
        deporte = data['deporte']
        fec_ingreso = data['fec_ingreso']
        tiempo_libre = data['tiempo_libre']
        rendimiento = data['rendimiento']
        prof_futuro = data['prof_futuro']


        try:
            connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
            query = "UPDATE medicinaingsw.paciente SET nombres = %s, apellidos = %s, direccion = %s, cor_elec = %s, comuna = %s, fono = %s, id_prevision = %s, fec_nacim = %s, sexo = %s, edad_menarq = %s, fec_menarq = %s, actividad = %s, deporte = %s, fec_ingreso = %s, tiempo_libre = %s, rendimiento = %s, prof_futuro = %s WHERE rut_paciente = " + rut_paciente
            values = (nombres,apellidos,direccion,cor_elec,comuna,fono,id_prevision,fec_nacim,sexo,edad_menarq,fec_menarq,actividad,deporte,fec_ingreso,tiempo_libre,rendimiento,prof_futuro)
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, values)
            connection.commit()
            connection.close()
            return {"message": "Paciente creado"}
        except Exception as inst:
            print(inst)
            return {"message": "Error"}

#GET Sexos
@app.route('/sexos', methods=['GET'])
def getSexos():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT * FROM medicinaingsw.sexo"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

#GET Previsiones
@app.route('/previsiones', methods=['GET'])
def getPrevisiones():
    try:
        connection = mysql.connector.connect(host='medicingsw.cxlfelfkaohe.us-east-1.rds.amazonaws.com',
                                             database='medicinaingsw',
                                             user='admin1',
                                             port='3306',
                                             password='M1st2r.12354')
        query = """SELECT * from medicinaingsw.prevision"""
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        print(records)
        connection.close()
        return jsonify(records)
    except:
        return {"message": "Error en conexion a base de datos de BD (GET-pacientes)"}

if __name__ == '__main__':
    app.run(debug=True)

